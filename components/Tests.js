import React, {Component} from 'react';
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
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Picker as SelectPicker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      pass: '',
      purposeValue: '',
      purposeIndexValue: '',
      terminalData: [],
      check_textInputChange: false,
      secureTextEntry: true,
      loader: false,
    };
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
    // this.getTerminatl();

    const tokenn = JSON.parse(await AsyncStorage.getItem('token'));
    const terminal = JSON.parse(await AsyncStorage.getItem('terminalid'));

    this.setState({
      token: tokenn,
      terminalId: terminal,
    });

    console.log('App token 😃 ', tokenn, terminal);

    // if(tokenn !==null){
    //   this.props.navigation.navigate("Bluetooth")
    // }

    // if(tokenn !== null){
    //   console.log("token")
    // this.props.navigation.navigate("Bluetooth")

    // }else{console.log('else')}
  }

  getUserAllData() {
    fetch(
      `http://65.1.153.238:8080/cgi-bin/koha/svc/report?name=LIBCON-PATINFO&userid=libcon&password=Admin@123&sql_params=${this.state.email}`,
      {
        method: 'GET',
        headers: {
          Accepts: 'application/json',
          'content-type': 'application/json',
        },
      },
    )
      .then(result => {
        result.json().then(async resp => {
          console.log(resp)
          if (resp.length !== 0) {
            await AsyncStorage.setItem('userId', JSON.stringify(resp[0][0]));
            await AsyncStorage.setItem('sName', JSON.stringify(resp[0][2]));
            await AsyncStorage.setItem('sNameLast', JSON.stringify(resp[0][3]));

            const sname = JSON.parse(await AsyncStorage.getItem('email'));
            console.log('resp : ', sname);
            this.setState({
              loader: false,
            });
            this.props.navigation.push('Home');
          } else{
            alert('No user found.')
            this.setState({
              loader: false,
            });
          }
        });
      })
      .catch(error => {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }

  onPickerValueChange = (value, index, label) => {
    this.setState(
      {
        purposeValue: value,
        // purposeName: this.state.terminalData[index].p_name,
      },
      // () => {
      //   console.log(this.state.terminalData[index].p_name);
      // },
    );
  };

  check() {
    if (
      this.state.email === '' ||
      this.state.pass === '' 
      // this.state.purposeValue === ''
    ) {
      console.log(this.state.pass);
      Alert.alert('', 'Please enter your account details to login.');
    } else if (
      this.state.email !== '' &&
      this.state.pass !== '' 
      // this.state.purposeValue !== ''
    ) {
      console.log(this.state.pass);
      this.signIn();
    }
  }

  signIn() {
    this.setState({loader: true});
    console.log(this.state.email, this.state.pass, this.state.purposeValue);

    fetch(
      `http://65.1.153.238:8080/cgi-bin/koha/svc/report?name=LIBCON-PATINFO&userid=libcon&password=Admin@123&sql_params=theartistnw@gmail.com`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
      },
    ).then(result => {
      result.json().then(async resp => {
        console.log(resp)
        if (resp.length !== 0) {
          await AsyncStorage.setItem('userId', JSON.stringify(resp[0][0]));
          await AsyncStorage.setItem('sName', JSON.stringify(resp[0][2]));
          await AsyncStorage.setItem('sNameLast', JSON.stringify(resp[0][3]));
          await AsyncStorage.setItem('email', JSON.stringify(resp[0][4]));

          const sname = JSON.parse(await AsyncStorage.getItem('email'));
          console.log('resp : ', sname);
          this.setState({
            loader: false,
          });
          this.props.navigation.push('Home');
        } else {
          this.setState({
            loader: false,
          });
          ToastAndroid.showWithGravity(
            "No user found.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      });
    }).catch(error => {
      ToastAndroid.showWithGravity(
        resp.message,
        ToastAndroid.SHORT,
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
      <SafeAreaProvider style={styles.container}>
        <StatusBar backgroundColor="#fff9" barStyle="dark-content" />

        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            marginTop: '10%',
          }}>
          <Image source={require('./image/bitsom.png')} />
        </View>

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

        <Animatable.View style={[styles.footer]} animation="fadeInUpBig">
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* --------TERMINAL----------- */}
            {/* s */}

              <View >
                
            {/* --------Email-------------------- */}

            <View >
              <Text style={[styles.text_footer, {marginTop: 20}]}> Email </Text>
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
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
            </View>

            {/* ------------Password------------- */}
            <Text style={[styles.text_footer, {marginTop: 20}]}>
              {' '}
              Password{' '}
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />

              <TextInput
                secureTextEntry={this.state.secureTextEntry ? true : false}
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
              <TouchableOpacity onPress={() => this.updateSecureTextEntry()}>
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

            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 15,
                marginTop:"25%",
                
              }}>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://libcon.in/')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Powered by</Text>
                <Text style={{color: '#f68823'}}> LIBCON</Text>
              </TouchableOpacity>
            </View>
              </View>

          </ScrollView>
        </Animatable.View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    // flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    // paddingVertical: 30,
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
});
