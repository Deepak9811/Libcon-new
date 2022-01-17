import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Linking,
  BackHandler,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


import BcryptReactNative from 'bcrypt-react-native';

export default class LogInNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      pass: '',
      libraryDetails: [],
      check_textInputChange: false,
      secureTextEntry: true,
      loader: false,
      showPage: false,
      userData: '',

      loaderLogo: true,
      libraryLogo: "",
      libraryCode: '',
      libraryToken: ''
    };
  }

  componentWillUnmount() {
    console.log("Not Possible")
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.disableBackButton(),
    );
  }

  disableBackButton() {
    BackHandler.exitApp();
    return true;
  }

  textInputchange(val) {
    if (val.length !== 0) {
      this.setState({
        email: val,
        check_textInputChange: true,
      });
    } else {
      this.setState({
        email: val,
        check_textInputChange: false,
      });
    }
  }

  handlePasswordChange(val) {
    this.setState({
      password: val,
    });
  }

  updateSecureTextEntry() {
    this.setState({
      secureTextEntry: false,
    });
  }

  async componentDidMount() {

    const email = JSON.parse(await AsyncStorage.getItem('email'));
    console.log("email : ", email)
    if (email !== null) {
      this.props.navigation.navigate('Home');
    } else {
      this.setState({
        showPage: true,
      });
    }


    this.getLibraryDetails()

  }


  async getLibraryDetails() {
    const libraryID = JSON.parse(await AsyncStorage.getItem('libraryID'));
    const library = JSON.parse(await AsyncStorage.getItem("libraryName"))


    this.setState({
      libraryCode: libraryID
    })

    console.log("libraryID ", libraryID)

    fetch(`https://api.libcon.in/api/v1/selectLibrary?code=${libraryID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        "APP-AUTH": "0197d42e-611b-481f-a735-2ae862467559",
      }
    }).then((result) => {
      result.json().then(async resp => {
        // console.log(resp.data.settings)
        if (resp.status === "success") {
          this.setState({
            loaderLogo: false,
            libraryDetails: resp.data,
            libraryLogo: resp.data.logo,
            libraryToken: resp.data.token,
            homeSetting: resp.data.settings,
            showLibcon: true,
          })

          // console.log("this.state.homeSetting :- ",this.state.homeSetting)

          await AsyncStorage.setItem("libraryToken", JSON.stringify(resp.data.token))

          // console.log("libraryLogo ", this.state.libraryLogo)
        } else {
          console.log("Something went wrong.")
          this.setState({
            showLibcon: false
          })
        }
      })
    })
  }


  async withoutSignIN() {
    try {

      await AsyncStorage.setItem("homeSettings", JSON.stringify(this.state.homeSetting))
      await AsyncStorage.setItem("welcomemsg", JSON.stringify(this.state.libraryDetails.wmsg))
      const homeSetting = JSON.parse(await AsyncStorage.getItem("homeSettings"))
      const welcomemsg = JSON.parse(await AsyncStorage.getItem("welcomemsg"))
      console.log("this.state.homeSetting :- ", welcomemsg)
      if (homeSetting.length !== 0) {
        this.props.navigation.navigate("Home")
      } else {
        Alert.alert("", "Something went wrong. Please try agains.", [{ text: "Okay" }], { cancelable: true })
      }

    } catch (error) {
      console.log("Something went wrong in without sign in. " + error)
    }
  }


  check() {
    if (
      this.state.email === '' ||
      this.state.pass === ''
    ) {
      console.log(this.state.pass);
      Alert.alert('', 'Please enter your account details to login.');
    } else if (
      this.state.email !== '' &&
      this.state.pass !== ''
    ) {
      console.log(this.state.pass);
      this.signIn();
    } else {
      Alert.alert('', 'Please enter your correct account details to login.');
    }
  }

  signIn() {
    this.setState({ loader: true });
    console.log(this.state.email.length, this.state.pass.length,);
    fetch(
      `https://api.libcon.in/api/v1/login?loginid=${this.state.email}&password=${this.state.pass}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          "APP-CODE": this.state.libraryCode,
          "APP-TOKEN": this.state.libraryToken,
        },
      },
    )
      .then(result => {
        result.json().then(async resp => {
          console.log("resp : ", resp);
          if (resp.length !== 0) {
            try {
              await AsyncStorage.setItem('userId', JSON.stringify(resp.data.id));
              await AsyncStorage.setItem('sName', JSON.stringify(resp.data.fName));
              await AsyncStorage.setItem('sNameLast', JSON.stringify(resp.data.lName));

            } catch (error) {
              console.log("try : ", error)
            }

            const sname = resp.data.email;
            console.log('resp : ', sname);

            if (this.state.email === sname) {

              // this.setState({
              //   userData: resp,
              // });
              // this.props.navigation.push('Home');
              console.log('match');

              try {
                const salt = await BcryptReactNative.getSalt(10);
                const hash = (salt, resp.data.password);
                const isSame = await BcryptReactNative.compareSync(
                  this.state.pass,
                  hash,
                );
                if (isSame === true) {
                  await AsyncStorage.setItem('email', JSON.stringify(resp.data.email));
                  await AsyncStorage.setItem('password', JSON.stringify(this.state.pass));
                  // alert("sahi h")
                  this.setState({
                    userData: resp.data,
                  });
                  this.props.navigation.push('Home');
                } else {
                  Alert.alert("", "Please check your details.", [
                    { text: 'Okay' }
                  ], { cancelable: true })
                }

                console.log('isSame : ', isSame, ', hash : ', hash);
                // this.props.navigation.push('Home');
                this.setState({
                  loader: false,
                });
              } catch (e) {
                console.log({ e });
              }
            } else {
              Alert.alert('', 'Please enter your correct account details to login.');
            }
            // this.props.navigation.push('Home');
          } else {
            this.setState({
              loader: false,
            });
            ToastAndroid.show(
              'Please enter your correct account details to login.',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          }
        });
      })
      .catch(error => {
        ToastAndroid.show(
          resp.message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        this.setState({
          loader: false,
        });
        console.log(
          'There has been a problem with your fetch operation: ' +
          error.message,
        );
      });

  }

  render() {
    return (
      <>
        {this.state.showPage ? (
          <View
            //  animation="fadeInRight" duration={400} 
            style={styles.container}>
            <StatusBar backgroundColor="#fff9" barStyle="dark-content" />

            <View style={{ padding: 10, flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("OnBoard")}>
                <AntDesign name="arrowleft" color="#05375a" size={20} />
              </TouchableOpacity>
              <Text style={{ marginLeft: "2%" }} onPress={() => this.props.navigation.navigate("OnBoard")}>Change Library</Text>
            </View>

            {this.state.loaderLogo ? (
              <>
                <ActivityIndicator size="large" color="#239BFF" style={styles.logoDesign} />
              </>
            ) :
              <View
                style={styles.logoDesign}>

                {this.state.showLibcon ? (
                  <Image
                    style={styles.imgDesign}
                    source={{ uri: `data:${this.state.mime};base64,${this.state.libraryLogo}` }} />
                ) :

                  <Image source={require('./image/bitsom.png')} />


                }
              </View>
            }



            {/* <View style={styles.header}>
          <Text style={[styles.text_header, {color: '#05375a'}]}>
            {' '}
            Welcome!{' '}
          </Text>
        </View> */}

            {this.state.loader ? (
              <>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    elevation: 3,
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

            <Animatable.View style={[styles.footer]} animation="fadeInUpBig" duration={900} >
              <ScrollView showsVerticalScrollIndicator={false}>

                <View>
                  {/* --------Email-------------------- */}

                  <View>
                    <Text style={[styles.text_footer, { marginTop: 20 }]}>
                      {' '}
                      Email{' '}
                    </Text>
                    <View style={styles.action}>
                      <FontAwesome name="user-o" color="#05375a" size={20} />

                      <TextInput
                        returnKeyType="next"
                        placeholder="Your Email"
                        style={styles.textInput}
                        value={this.state.email}
                        onChangeText={val => {
                          this.textInputchange(val);
                          this.setState({
                            email: val,
                          });
                        }}
                      />
                      {this.state.check_textInputChange ? (
                        <Animatable.View animation="bounceIn">
                          <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                          />
                        </Animatable.View>
                      ) : null}
                    </View>
                  </View>

                  {/* ------------Password------------- */}
                  <Text style={[styles.text_footer, { marginTop: 20 }]}>
                    {' '}
                    Password{' '}
                  </Text>
                  <View style={styles.action}>
                    <Feather name="lock" color="#05375a" size={20} />

                    <TextInput
                      secureTextEntry={
                        this.state.secureTextEntry ? true : false
                      }
                      returnKeyType="next"
                      placeholder="Your Password"
                      style={styles.textInput}
                      value={this.state.pass}
                      onChangeText={val => {
                        this.handlePasswordChange(val);
                        this.setState({
                          pass: val,
                        });
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => this.updateSecureTextEntry()}>
                      {this.state.secureTextEntry ? (
                        <Feather name="eye-off" color="grey" size={20} />
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              secureTextEntry: true,
                            })
                          }>
                          <Feather name="eye" color="green" size={20} />
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.check()}>
                    <LinearGradient
                      colors={['#f68823', '#b03024']}
                      style={styles.signIn}>
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: '#fff',
                          },
                        ]}>
                        Sign In
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.withoutSignIN()} style={styles.withoutsign}>
                    <Text style={{ color: '#f68823', }}>Continue without Sign In</Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical: 15,
                      marginTop: '10%',
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
                </View>
              </ScrollView>
            </Animatable.View>
          </View>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgDesign: {
    height: 150,
    width: 120,
    borderRadius: 5,
  },
  logoDesign: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomColor: '#f68823',
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
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
  withoutsign: { alignItems: "center", justifyContent: "center", marginTop: "5%" }
});
