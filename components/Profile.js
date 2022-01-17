import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Appbar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'NaN',
      userEmail: 'NaN',
      validUpto: 'NaN',
      userData: [],
      userMemberShip: 'NaN',
      userPrimaryPhone: 'NaN',
      // userSecondaryPhone: 'NaN',
      fine: '0.00',
      userAddress: 'India',
      userDOB: '00/00/0000',
      userGender: 'Gender',
      emailUser: [],
      loader: true,
      image: require('./image/cat.jpg.png'),
      visibleImage1New: false,
      showpage: true,
      name: '',
      email: '',
      id: '',
    };
  }

  async componentDidMount() {
    try {
      const email = JSON.parse(await AsyncStorage.getItem('email'));
      const userId = JSON.parse(await AsyncStorage.getItem('userId'));
      const sName = JSON.parse(await AsyncStorage.getItem('sName'));
      const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));
      const libraryID = JSON.parse(await AsyncStorage.getItem('libraryID'));
      const password = JSON.parse(await AsyncStorage.getItem('password'));
      const token = JSON.parse(await AsyncStorage.getItem('libraryToken'));

      this.setState({
        name: sName + ' ' + sNameLast,
        id: userId,
        email: email,
        libraryCode: libraryID,
        password: password,
        token:token
      });
      this.userDetails();
      // console.log('email : ', this.state.name);
    } catch (error) {
      console.log('There has problem in AsyncStorage : ' + error.message);
    }
  }

  userDetails() {
    console.log('email : ', this.state.email,this.state.password);
    fetch(
      `https://api.libcon.in/api/v1/login?loginid=${this.state.email}&password=${this.state.password}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "APP-TOKEN": this.state.token,
          "APP-CODE": this.state.libraryCode
        },
      },
    )
      .then(result => {
        result.json().then(resp => {
          console.log('userAddress : ', resp.data.fName);

          if (resp.length !== 0) {
            this.setState({
              userData: resp.data,
              userName: resp.data.fName + ' ' + resp.data.lName,
              userEmail: resp.data.email,
              userMemberShip: resp.data.memberId,
              validFrom: resp.data.validFrom,
              validUpto: resp.data.validUpto,
              userPrimaryPhone: resp.data.phone,
              fine: resp.data.fine,
              visibleImage1New: true,
              image: resp.data.photo,
              userDOB: resp.data.dob,
              userAddress: resp.data.address,
              userGender: resp.data.gender,
              loader: false,
            });
          } else {
            this.setState({
              loader: false,
            });
            ToastAndroid.showWithGravity(
              'Something wents wrong.',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }

          // console.log(this.state.image);
        });
      })
      .catch(error => {
        this.setState({
          loader: false,
        });
        Alert.alert('Error', error.message, [{ text: 'Okay' }]);
      });


    // setTimeout(() => {
    //   console.log(this.state.userData.length)
    //   if (this.state.userData.length > 0) {
    //     console.log('null');
    //   } else {
    //     this.setState({
    //       message: 'Sorry, the requested page is not available',
    //       showpage: false,
    //       loader: false
    //     });
    //   }
    // }, 10000);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <Appbar.Header style={styles.ttl}>
          <TouchableOpacity
            style={{ paddingLeft: '2%' }}
            onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="arrowleft" color="#05375a" size={25} />
          </TouchableOpacity>
          <Appbar.Content title="Your Profile Details" />
        </Appbar.Header>

        {!this.state.loader ? (
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}>
              {this.state.showpage ? (
                <View style={{ flex: 1 }}>
                  {/* ===============INFO======================= */}
                  <View style={{ margin: '5%' }}>
                    <View style={styles.uDetail}>
                      <Text style={styles.uNme}>Hello</Text>
                      <Text style={styles.uNme}>{this.state.userName}</Text>

                      <Text style={{ marginTop: 10, color: '#8A8A8A' }}>
                        Welcome to Learning Resource Center, BITSoM, Mumbai{' '}
                      </Text>
                    </View>

                    {/* ==============IMAGE==================== */}
                    <View style={styles.profImgage}>
                      <Image
                        source={
                          this.state.visibleImage1New
                            ? {
                              uri: `data:${this.state.mime};base64,${this.state.image}`,
                            }
                            : this.state.image
                        }
                        style={{ height: 250, width: 320 }}
                      />
                    </View>

                    <LinearGradient
                      colors={['#f7f6ff', '#eff3fe']}
                      style={styles.commonGradient}>
                      <View style={{ marginBottom: '4%' }}>
                        <Text style={styles.text_footer}>Username :</Text>

                        <View style={styles.editInfo}>
                          <View style={styles.iconC}>
                            <Feather name="user" color="#191919" size={20} />
                          </View>
                          <View>
                            <Text style={styles.fillDetails}>
                              {this.state.userName}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* ================Email===================== */}
                    <LinearGradient
                      colors={['#eff7ee', '#eff7ee']}
                      style={styles.commonGradient}>
                      <View style={{ marginBottom: '4%' }}>
                        <Text style={styles.text_footer}>Email Id :</Text>

                        <View style={styles.editInfo}>
                          <View style={styles.iconC}>
                            <MaterialCommunityIcons
                              name="email-outline"
                              color="#77aa69"
                              size={20}
                            />
                          </View>

                          <View>
                            <Text
                              style={[styles.fillDetails, { color: '#77aa69' }]}>
                              {this.state.userEmail}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* ================Membership id====================== */}

                    <LinearGradient
                      colors={['#fce5e5', '#f5ddde']}
                      style={styles.commonGradient}>
                      <View style={{ marginBottom: '4%' }}>
                        <Text style={styles.text_footer}>Membership Id :</Text>

                        <View style={styles.editInfo}>
                          <View style={styles.iconC}>
                            <Feather
                              name="user-check"
                              color="#e1495e"
                              size={20}
                            />
                          </View>
                          <View>
                            <Text
                              style={[styles.fillDetails, { color: '#e1495e' }]}>
                              {this.state.userMemberShip}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* ================Fine ===================== */}
                    <LinearGradient
                      colors={['#f7f6ff', '#eff3fe']}
                      style={styles.commonGradient}>
                      <View style={{ marginBottom: '4%' }}>
                        <Text style={styles.text_footer}>Fine :</Text>

                        <View style={styles.editInfo}>
                          <View style={styles.iconC}>
                            <FontAwesome
                              name="rupee"
                              color="#191919"
                              size={20}
                            />
                          </View>
                          <View>
                            <Text
                              style={[styles.fillDetails, { color: '#191919' }]}>
                              {this.state.fine}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* ================Date Of Birth====================== */}
                    <LinearGradient
                      colors={['#fff6e7', '#fff6e7']}
                      style={styles.commonGradient}>
                      <View style={{ marginBottom: '4%' }}>
                        <Text style={styles.text_footer}>Date Of Birth :</Text>

                        <View style={styles.editInfo}>
                          <View style={styles.iconC}>
                            <AntDesign
                              name="calendar"
                              color="#da8d0b"
                              size={20}
                            />
                          </View>
                          <View>
                            <Text
                              style={[styles.fillDetails, { color: '#da8d0b' }]}>
                              {this.state.userDOB}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* ================Gender====================== */}
                    <LinearGradient
                      colors={['#f7fcff', '#f7fcff']}
                      style={styles.commonGradient}>
                      <View style={{ marginBottom: '4%' }}>
                        <Text style={styles.text_footer}>Gender :</Text>

                        <View style={styles.editInfo}>
                          <View style={styles.iconC}>
                            <Feather name="user" color="#3860cc" size={20} />
                          </View>

                          <View>
                            <Text
                              style={[styles.fillDetails, { color: '#3860cc' }]}>
                              {this.state.userGender}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* ================Address===================== */}
                    <LinearGradient
                      colors={['#f7f6ff', '#f7f6ff']}
                      style={styles.commonGradient}>
                      <View style={{ marginBottom: '4%' }}>
                        <Text style={styles.text_footer}>Address :</Text>

                        <View style={styles.editInfo}>
                          <View style={styles.iconC}>
                            <Fontisto
                              name="world-o"
                              color="#969697"
                              size={20}
                            />
                          </View>
                          <View style={{ width: '87%' }}>
                            <Text
                              style={[styles.fillDetails, { color: '#969697' }]}>
                              {this.state.userAddress}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* ================Primary Phone====================== */}
                    <LinearGradient
                      colors={['#eff7ee', '#eff7ee']}
                      style={styles.commonGradient}>
                      <View style={{ marginBottom: '4%' }}>
                        <Text style={styles.text_footer}>Primary Phone :</Text>

                        <View style={styles.editInfo}>
                          <View style={styles.iconC}>
                            <AntDesign name="phone" color="#77aa69" size={20} />
                          </View>
                          <View>
                            <Text
                              style={[styles.fillDetails, { color: '#77aa69' }]}>
                              {this.state.userPrimaryPhone}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* ================Secondary Phone====================== */}
                    {/* <LinearGradient
                    colors={['#fce5e5', '#f5ddde']}
                    style={styles.commonGradient}>
                    <View style={{marginBottom: '4%'}}>
                      <Text style={styles.text_footer}>Secondary Phone :</Text>

                      <View style={styles.editInfo}>
                        <View style={styles.iconC}>
                          <AntDesign name="phone" color="#e1495e" size={20} />
                        </View>
                        <View>
                          <Text
                            style={[styles.fillDetails, {color: '#e1495e'}]}>
                            {this.state.userSecondaryPhone}
                          </Text>
                        </View>
                        
                      </View>
                    </View>
                  </LinearGradient> */}

                    {/* ================Valid from====================== */}
                    <LinearGradient
                      colors={['#fff6e7', '#fff6e7']}
                      style={styles.commonGradient}>
                      <View style={{ marginBottom: '4%' }}>
                        <Text style={styles.text_footer}>Valid from :</Text>

                        <View style={styles.editInfo}>
                          <View style={styles.iconC}>
                            <AntDesign
                              name="calendar"
                              color="#da8d0b"
                              size={20}
                            />
                          </View>
                          <View>
                            <Text
                              style={[styles.fillDetails, { color: '#da8d0b' }]}>
                              {this.state.validFrom}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* ================Valid Upto====================== */}
                    <LinearGradient
                      colors={['#f7f6ff', '#eff3fe']}
                      style={styles.commonGradient}>
                      <View style={{ marginBottom: '4%' }}>
                        <Text style={styles.text_footer}>Valid Upto :</Text>

                        <View style={styles.editInfo}>
                          <View style={styles.iconC}>
                            <AntDesign
                              name="calendar"
                              color="#191919"
                              size={20}
                            />
                          </View>
                          <View>
                            <Text
                              style={[styles.fillDetails, { color: '#191919' }]}>
                              {this.state.validUpto}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* ============================================== */}
                    <View style={{ marginTop: '5%' }}>
                      <Text style={{ color: '#8A8A8A' }}>
                        These details are taken from your existing Profile with
                        the Library. In case you need to update them, please
                        contact the helpdesk at the Library.
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                    }}>
                    {this.state.message}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator color="#57A3FF" size="large" />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  ttl: {
    backgroundColor: '#ffffff',
  },
  text_footer: {
    color: '#BDBDBD',
    fontSize: 16,
    marginBottom: '2%',
    marginTop: 5,
    // fontWeight:"700"
  },
  fillDetails: {
    flexDirection: 'row',
    fontSize: 17,
    color: '#0B0B0B',
    marginBottom: '3%',
    // fontWeight:"700"
  },
  rightIcon: {
    marginTop: 4,
    flex: 1,
    width: '100%',
  },
  rightM: {
    textAlign: 'right',
    marginRight: 20,
  },
  editInfo: {
    flexDirection: 'row',

    // paddingBottom: 10,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    // elevation: 3,
  },
  commonGradient: {
    width: '100%',
    // height: 70,
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 10,
    // borderBottomColor: '#f68823',
    // borderBottomWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  iconC: {
    marginTop: 3,
    marginRight: 10,
    // marginLeft: 20,
  },
  uDetail: {
    // marginTop: 10,
    marginBottom: 10,
  },
  uNme: {
    fontSize: 30,
  },
  profImgage: {
    width: '100%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
});
