import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';
import QRCode from 'react-native-qrcode-svg';

export default class DownloadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_Path:
        'https://cdn.pixabay.com/photo/2016/11/14/04/25/umbrella-1822586_960_720.jpg',
    };
  }

  checkPermision = async () => {
    if (Platform.OS === 'ios') {
      this.downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission Granted');
          this.downloadImage();
        } else {
          console.log('Storage permission not Granted');
        }
      } catch (error) {
        console.log('errro', error);
      }
    }
  };

  downloadImage = () => {
    let date = new Date();
    let image_URL = this.state.image_Path;
    let ext = this.getExtention(image_URL);
    console.log("ext :-",ext)
    ext = '.' + ext[0];
    // GET CONFIG AND FS FROM RNFETCHBLOG
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res :', JSON.stringify(res));
        alert('Image downloaded successfully.');
      });
  };

  getExtention = filename => {
    console.log("filename :- ",filename)
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <Image source={{uri: this.state.image_Path}} style={styles.image} />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.checkPermision()}>
          <Text style={styles.text}>Dowload Image</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'orange',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    margin: 5,
  },
});
