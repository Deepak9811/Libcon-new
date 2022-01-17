import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  ClientId:
    '48774575517-o9j0crni6shsal3jnoerm1o19pdqkg05.apps.googleusercontent.com',
  // offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export default class PageFirst extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPage: false,
      userGoogleInfo: {},
      image: '',
      email: '',
      name: '',
      loader: false,
    };
  }

  async componentDidMount() {

    const email = JSON.parse(await AsyncStorage.getItem('email'));
    const library = JSON.parse(await AsyncStorage.getItem("libraryName"))

    console.log("email : ", email)
    if (email !== null) {
      this.props.navigation.navigate('Home');
    } else {
      if (library !== null) {
        console.log("library", library)
        this.props.navigation.navigate('LogInNew');
      } else {

        this.setState({
          showPage: true,
        });
      }

    }



  }


  render() {
    return (
      <>
        {this.state.showPage ? (
          <View style={{ backgroundColor: "#fff" }}>
            {this.state.showPage ? (
              <Animatable.View animation="fadeInUpBig" duration={400} style={styles.container}>
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
                <View style={styles.imageCen}>
                  <Image source={require('./image/bitsom.png')} />

                  <Text style={{ fontSize: 17, color: '#003f5c', marginTop: '5%' }}>
                    Greeting from LIBCON
                  </Text>

                  {/* <Text>Welcome to your personal library space.</Text> */}
                  {/* <TouchableOpacity
                // onPress={() => this.signIn()}
                style={{ marginTop: 20, marginBottom: 20, width: "70%" }}
                onPress={() => this.props.navigation.push('LogInNew')}
              >
                <View style={styles.google}>
                  <LinearGradient
                    colors={['#f68823', '#b03024']} style={styles.googleStyle}>
<AntDesign name="arrowleft" color="#fff" size={18} style={{marginRight:"5%"}}/>
                    <Text style={styles.googleFontStyle}>Change Library</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity> */}


                  <TouchableOpacity onPress={() => this.props.navigation.push("OnBoard")} >

                    {/* <Text style={{ fontSize: 15, color: '#b03024', marginTop: '5%' }}>
                  <AntDesign name="arrowleft" color="#b03024" size={18} />   Change Library
                </Text> */}
                  </TouchableOpacity>


                </View>

                {this.state.loader ? (
                  <>
                    <View
                      style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        elevation: 1,
                        backgroundColor: 'rgba(0,0,0,0.2)',
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

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 14, color: '#6b6b6b' }}>
                    Welcome to your personal library space
                  </Text>

                </View>

                <View style={styles.info}>
                  <TouchableOpacity
                    // onPress={() => this.signIn()}
                    style={{ marginTop: 10, marginBottom: 20 }}
                    onPress={() => this.props.navigation.push('OnBoard')}
                  >
                    <View style={styles.google}>
                      <LinearGradient
                        colors={['#f68823', '#b03024']} style={styles.googleStyle}>

                        <Text style={styles.googleFontStyle}>Pick your Library here...</Text>
                      </LinearGradient>
                    </View>
                  </TouchableOpacity>

                  {/* <TouchableOpacity style={{ alignItems: "center" }}>
                <Text style={{ color: '#f68823' }}>Continue with guest</Text>
              </TouchableOpacity> */}

                </View>


                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('https://libcon.in/')}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Powered by</Text>
                    <Text style={{ color: '#f68823' }}> LIBCON</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            ) : null}
          </View>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { height: '100%', width: '100%', backgroundColor: '#fff' },
  imageCen: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    flex: 1,

    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  google: {
    borderRadius: 10,
  },
  googleStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: '4%',
    // paddingBottom: '4%',
    height: 50,
    borderRadius: 10,
  },
  googleFontStyle: { fontSize: 16, color: '#fff' },
  ttl: {
    backgroundColor: '#ffffff',
  },
});
