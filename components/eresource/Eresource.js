import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';

import {Appbar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publisherData: [],
      searchquery: '',
      label: '',
      loader: true,
      showData: false,
    };
  }

  componentDidMount() {
    console.log('component');

    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `https://bitsomt.refread.com/webservice/pub/eResources/all`)
      .then(resp => {
        const strig = resp.data;

        const splt = JSON.parse(strig);

        // const publics = JSON.stringify(splt.details);

        // console.log(splt.details[1].label);

        this.setState({
          publisherData: splt.details,
          loader: false,
          showData: true,
        });
      })
      .catch((error, statusCode) => {
        console.log('statusCode :', statusCode);
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }

  getDetails(item) {
    console.log('label : ', item.label);

    (this.state.searchquery = item.searchQuery),
      (this.state.label = item.label),
      console.log('state : ', this.state.searchquery);

    if (this.state.searchquery !== '' && this.state.label !== '') {
      this.nextPageDetails();
    } else {
      console.log('Something wents wrong.');
    }
  }

  async nextPageDetails() {
    try {
      await AsyncStorage.setItem(
        'searchquery',
        JSON.stringify(this.state.searchquery),
      );
      await AsyncStorage.setItem(
        'labelLocal',
        JSON.stringify(this.state.label),
      );

      const searchqueryLocal = JSON.parse(
        await AsyncStorage.getItem('searchquery'),
      );
      const labelLocal = JSON.parse(await AsyncStorage.getItem('labelLocal'));

      this.props.navigation.navigate('PublicerDetails');

      console.log('searchquery local : ', searchqueryLocal, labelLocal);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <Appbar.Header style={styles.ttl}>
          <TouchableOpacity
            style={{paddingLeft: '2%'}}
            onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="arrowleft" color="#05375a" size={25} />
          </TouchableOpacity>

          <Appbar.Content title="E-Resource" />
        </Appbar.Header>

        {this.state.loader ? (
          <>
            <View
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                elevation: 3,
                // backgroundColor: 'rgba(0,0,0,0.2)',
              }}></View>
            <View
              style={{
                flex: 1,
                width: '100%',
                position: 'absolute',
                elevation: 3,
                top: '50%',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="#0d6efd" />
            </View>
          </>
        ) : null}

        <View style={styles.container}>
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.state.showData ? (
                <View style={{marginBottom: '10%'}}>
                  <View style={[styles.commonGradient,{marginBottom:"5%"}]}>
                   
                    <Text style={styles.library}>BITSoM DIGITAL LIBRARY</Text>
                  </View>

                  {this.state.publisherData.map((item, i) => {
                    {
                      console.log('item =>', item.url);
                    }
                    return (
                      <React.Fragment key={i}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => this.getDetails(item)}>
                          <LinearGradient
                            colors={['#f7f6ff', '#eff3fe']}
                            style={styles.commonGradient}>
                            <View style={{flexDirection: 'row'}}>
                              <View style={styles.iconC}>
                                <Image
                                  style={{width: 25, height: 25}}
                                  source={{
                                    uri: `${item.url}`,
                                  }}
                                />
                              </View>

                              <View>
                                <Text
                                  style={[
                                    styles.textCommon,
                                    {color: '#191919', marginTop: '5%'},
                                  ]}>
                                  {item.label}
                                </Text>
                              </View>

                              <View style={styles.rightIcon}>
                                <Feather
                                  name="chevron-right"
                                  color="#5ec6e9"
                                  size={15}
                                  style={styles.rightM}
                                />
                              </View>
                            </View>
                          </LinearGradient>
                        </TouchableOpacity>
                      </React.Fragment>
                    );
                  })}
                </View>
              ) : null}
            </ScrollView>
          </>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ttl: {
    backgroundColor: '#fff',
  },
  container: {
    marginLeft: '5%',
    marginRight: '5%',
  },

  button: {
    alignItems: 'center',
    marginTop: 13,
  },
  commonGradient: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  textCommon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconC: {
    marginTop: 4,
    marginRight: 10,
    marginLeft: 20,
  },
  rightIcon: {
    justifyContent: 'center',
    marginTop: 4,
    flex: 1,
    
  },
  rightM: {
    textAlign: 'right',
    marginRight: 20,
  },
  scrollView: {
    flexGrow: 1,
    flex: 1,
  },
  library: {
    color: '#6f6f6f',
    fontSize: 18,
    fontWeight: '700',
    marginTop: '5%',
    borderBottomColor: '#f68823',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});
