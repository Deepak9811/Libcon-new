import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  BackHandler, Alert, ActivityIndicator, Dimensions, Image, ImageBackground
} from 'react-native';

import { Appbar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Carousel from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userGoogleInfo: {},
      name: '',
      email: '',
      id: '',
      loader: false,
      Quote: '',
      showQuote: false,
      showName: true,
    };
  }
  async componentDidMount() {
    try {
      const email = JSON.parse(await AsyncStorage.getItem('email'));
      const userId = JSON.parse(await AsyncStorage.getItem('userId'));
      const sName = JSON.parse(await AsyncStorage.getItem('sName'));
      const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));


      const libraryID = JSON.parse(await AsyncStorage.getItem('libraryID'));
      const token = JSON.parse(await AsyncStorage.getItem('libraryToken'));
      const password = JSON.parse(await AsyncStorage.getItem('password'));

      const homeSetting = JSON.parse(await AsyncStorage.getItem("homeSettings"))
      const welcomemsg = JSON.parse(await AsyncStorage.getItem("welcomemsg"))

      this.setState({
        name: sName + ' ' + sNameLast,
        id: userId,
        email: email,


        libraryCode: libraryID,
        password: password,
        token: token,
        welecomeMsg: welcomemsg,
        homeSetting: homeSetting
      });


      if (sName === null) {
        console.log(sName)
        this.setState({
          showName: false
        })
      }

      console.log('email : ', this.state.homeSetting);
    } catch (error) {
      console.log('There has problem in AsyncStorage : ' + errro.message);
    }


    this.getSliderData();
    this.getQuote()
  }



  // backButton() {
  //   BackHandler.addEventListener(
  //     'hardwareBackPress',

  //     this.disableBackButton(),
  //   );
  // }

  componentWillUnmount() {

    if (this.state.sName !== null && this.state.email !== null) {
      console.log("Not Possible")
      BackHandler.removeEventListener(
        'hardwareBackPress',

        this.disableBackButton(),
      );
    } else {
      console.log("Go Back is possible")
    }


  }

  disableBackButton() {
    BackHandler.exitApp();
    // Alert.alert('Exit From App', 'Do you want to exit from app ?', [
    //   {text: 'Yes', onPress: () =>  BackHandler.exitApp()},
    //   {text: 'No', onPress: () => console.warn('No Pressed')},
    // ]);
    return true;
  }

  logOut() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.disableBack(),
    );
  }

  disableBack() {
    Alert.alert('Log Out From App', 'Do you want to log out from app ?', [
      { text: 'Yes', onPress: () => this.clearToken() },
      { text: 'No', onPress: () => console.warn('No Pressed') },
    ]);
    return true;
  }

  async clearToken() {
    let dtaRemove = ["email", "sName"]
    await AsyncStorage.multiRemove(dtaRemove)
    BackHandler.exitApp()
  }


  getSliderData() {



    fetch(`https://api.libcon.in/api/v1/newArrivals`, {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'content-type': 'application/json',
        "LIB-CODE": this.state.libraryCode,
        "APP-TOKEN": this.state.token
      },
    }).then(result => {
      result.json().then(resp => {
        // console.log("response slider :- ",resp)

        if (resp.status === "success") {
          this.setState({
            sliderData: resp.data,
            showSlider: true
          })
          // console.log("data :- ", this.state.sliderData)
        } else {
          this.setState({
            showSlider: false
          })

        }
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        showSlider: false
      })
    })
  }


  getQuote() {

    fetch(`https://zenquotes.io/api/random`, {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'content-type': 'application/json',
      },
    }).then(result => {
      result.json().then(resp => {
        console.log("Quote of the day :- ", resp[0].q)

        if (resp.length > 0) {
          this.setState({
            Quote: resp[0].q,
            showQuote: true
          })
        } else {
          this.setState({
            showQuote: false
          })

        }
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        showSlider: false
      })
    })
  }




  _renderItem = ({ item, index }) => {

    {
      if (item.photo === "http://api.libcon.in/Images/NoPhoto.png") {
        this.state.showImage = false
      } else {
        this.state.showImage = true
      }
    }

    return (
      <React.Fragment key={index}>

        <TouchableOpacity style={{ borderRadius: 8, marginBottom: "10%" }} onPress={() => this.getBiblionumber(item)}>
          <View style={[{ marginTop: "5%", alignItems: "center", justifyContent: "center", borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }]}>
            <View style={{
              borderRadius: 8, shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 5
            }}>
              <Image style={{ display: this.state.showImage ? "flex" : "none", width: 150, height: 200, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} source={{ uri: item.photo }} />


              {!this.state.showImage ? (
                <View style={{ height: 200, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", padding: 5 }}>

                  <Text style={{ padding: 5 }}>{item.item.title}</Text>
                  <Text style={{ paddingTop: 2, paddingLeft: 5, paddingBottom: 5 }}>{item.item.author}</Text>

                </View>
              ) :
                null
              }



            </View>
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  }

  async getBiblionumber(item) {
    console.log(item.item.biblionumber)

    if (item.item.biblionumber.length !== 0) {
      await AsyncStorage.setItem('opacNext', JSON.stringify(item.item.biblionumber));
      await AsyncStorage.setItem('opacNextAuthor', JSON.stringify(item.item.title));
      const da = JSON.parse(await AsyncStorage.getItem('opacNext'));
      const opacNextAutho = JSON.parse(
        await AsyncStorage.getItem('opacNextAuthor'),
      );
      console.log('data : ', da, opacNextAutho);
      // console.log('mail', this.props.route.params.da);
      this.props.navigation.push('OpacNext');
    } else {
      console.log('no data');
    }


  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#895b82" barStyle="light-content" />
        {/* <Appbar.Header style={styles.ttl}>
          <Appbar.Content title="Home" />
        </Appbar.Header> */}

        <ImageBackground source={require('./image/bc1.png')} resizeMode="cover" style={{
          flex: 1,
          justifyContent: "center"
        }}>



          <View style={styles.container}>


            <>
              <ScrollView showsVerticalScrollIndicator={false}>


                <View style={styles.uDetail}>
                  
                  {this.state.showName ? (
                    <>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.uNme, {width: '70%', color: "#fff" }]}>Hello</Text>
                    <TouchableOpacity
                      onPress={() => this.logOut()}
                      style={{
                        justifyContent: 'center',
                        flex: 1,
                        alignItems: 'center',
                        borderRadius: 5,
                      }}>
                      <View style={{ flexDirection: 'row', marginLeft: 10,}}>
                        <Text
                          style={{ justifyContent: 'center', alignItems: 'center', color: "#fff", }}>
                          Logout
                        </Text>
                        <MaterialIcons
                          name="logout"
                          color="#fff"
                          size={15}
                          style={{ marginLeft: 5, marginTop: 3 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                      <Text style={styles.uNme}>{this.state.name}</Text>
                    </>
                  ) : null}
                  <Text style={{ marginTop: "5%", color: '#fff' }}>
                    {this.state.welecomeMsg}
                  </Text>


                </View>



                <View style={{ marginBottom: '10%', }}>

                  {/* ---------PROFILE */}
                  {this.state.showName ? (

                    < TouchableOpacity
                      style={styles.button}
                      onPress={() => this.props.navigation.push('Profile')}>
                      <LinearGradient
                        colors={['#f7f6ff', '#eff3fe']}
                        style={styles.commonGradient}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={styles.iconC}>
                            <Feather name="user" color="#191919" size={20} />
                          </View>

                          <View>
                            <Text style={[styles.textCommon, { color: '#191919' }]}>
                              Your Profile
                            </Text>
                          </View>

                          <View style={styles.rightIcon}>
                            <Feather
                              name="chevron-right"
                              color="#5ec6e9"
                              size={20}
                              style={styles.rightM}
                            />
                          </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>

                  ) : null}

                  {/*  ---------------------------ACCOUNT------------------------------ */}

                  {this.state.showName ? (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.props.navigation.navigate('Accountss')}>
                      <LinearGradient
                        colors={['#eff7ee', '#eff7ee']}
                        style={styles.commonGradient}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={styles.iconC}>
                            <Feather name="lock" color="#77aa69" size={20} />
                          </View>
                          <View>
                            <Text style={[styles.textCommon, { color: '#77aa69' }]}>
                              Your Account
                            </Text>
                          </View>
                          <View style={styles.rightIcon}>
                            <Feather
                              name="chevron-right"
                              color="#5a9d48"
                              size={20}
                              style={styles.rightM}
                            />
                          </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : null}

                  {/* -----------------ABOUT--------------------------- */}

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.push('About')}>
                    <LinearGradient
                      colors={['#fce5e5', '#f5ddde']}
                      style={styles.commonGradient}>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconC}>
                          <AntDesign
                            name="infocirlceo"
                            color="#e1495e"
                            size={20}
                          />
                        </View>

                        <View>
                          <Text style={[styles.textCommon, { color: '#e1495e' }]}>
                            More About The Library
                          </Text>
                        </View>

                        <View style={styles.rightIcon}>
                          <Feather
                            name="chevron-right"
                            color="#e1495e"
                            size={20}
                            style={styles.rightM}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* -----------------CHECKOUT------------------------------ */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.push('Opac')}>
                    <LinearGradient
                      colors={['#fff6e7', '#fff6e7']}
                      style={styles.commonGradient}>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconC}>
                          <Feather
                            name="check-circle"
                            color="#da8d0b"
                            size={20}
                          />
                        </View>

                        <View>
                          <Text style={[styles.textCommon, { color: '#da8d0b' }]}>
                            Search Book (OPAC)
                          </Text>
                        </View>

                        <View style={styles.rightIcon}>
                          <Feather
                            name="chevron-right"
                            color="#da8d0b"
                            size={20}
                            style={styles.rightM}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* ------------------Pay-FINE------------------------ */}

                  {/* <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.push('Pay')}>
                  <LinearGradient
                    colors={['#f7fcff', '#f7fcff']}
                    style={styles.commonGradient}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.iconC}>
                        <FontAwesome name="rupee" color="#3860cc" size={20} />
                      </View>

                      <View>
                        <Text style={[styles.textCommon, {color: '#3860cc'}]}>
                          Pay Fine
                        </Text>
                      </View>

                      <View style={styles.rightIcon}>
                        <Feather
                          name="chevron-right"
                          color="#3860cc"
                          size={20}
                          style={styles.rightM}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity> */}

                  {/* ----------E-RESOURCES------------------ */}

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.push('Eresource')}>
                    <LinearGradient
                      colors={['#f7f6ff', '#f7f6ff']}
                      style={styles.commonGradient}>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconC}>
                          <AntDesign name="book" color="#969697" size={20} />
                        </View>

                        <View>
                          <Text style={[styles.textCommon, { color: '#969697' }]}>
                            E-Resources
                          </Text>
                        </View>

                        <View style={styles.rightIcon}>
                          <Feather
                            name="chevron-right"
                            color="#969697"
                            size={20}
                            style={styles.rightM}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* ------------CONTACT--------------------- */}

                  <TouchableOpacity
                    style={[
                      styles.button,

                    ]}
                    onPress={() => this.props.navigation.push('Contact')}>
                    <LinearGradient
                      colors={['#eff7ee', '#eff7ee']}
                      style={styles.commonGradient}>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconC}>
                          <AntDesign name="contacts" color="#77aa69" size={20} />
                        </View>

                        <View>
                          <Text style={[styles.textCommon, { color: '#77aa69' }]}>
                            Contact The Library
                          </Text>
                        </View>

                        <View style={styles.rightIcon}>
                          <Feather
                            name="chevron-right"
                            color="#77aa69"
                            size={20}
                            style={styles.rightM}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>



                  {/* ================Logut================== */}


                  {/* <TouchableOpacity
                    style={[styles.button, {
                      marginBottom: '5%',
                    },]}
                    onPress={() => this.logOut()}
                  >
                    <LinearGradient
                      colors={['#f7fcff', '#f7fcff']}
                      style={styles.commonGradient}>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconC}>
                          <MaterialIcons name="logout" color="#3860cc" size={20} />
                        </View>

                        <View>
                          <Text style={[styles.textCommon, { color: '#3860cc' }]}>
                            LogOut
                          </Text>
                        </View>

                        <View style={styles.rightIcon}>
                          <Feather
                            name="chevron-right"
                            color="#3860cc"
                            size={20}
                            style={styles.rightM}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity> */}










                  {/* ------------------------------SLIDER----------------------------------------------------- */}


                  <View style={{ marginBottom: "5%", marginTop: "8%" }}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff', marginBottom: "6%" }}>

                    </View>

                    <View>
                      <Text >
                        Latest books in your library.
                      </Text>
                    </View>


                    {this.state.showSlider ? (

                      <View style={{ marginTop: "8%", marginBottom: "3%" }} >
                        <Carousel
                          layout={'default'} layoutCardOffset={18}
                          ref={(c) => { this._carousel = c; }}
                          data={this.state.sliderData}
                          renderItem={this._renderItem}
                          sliderWidth={viewportWidth}
                          itemWidth={155}
                        />
                      </View>

                    ) : <View style={styles.activityIndicatorStyle}>
                      <ActivityIndicator color="#57A3FF" size="large" />
                    </View>
                    }



                    <View style={{ marginBottom: "20%" }}>
                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff', }}></View>


                      <View style={{ marginBottom: "5%", marginTop: "10%" }}>
                        <Text >
                          Quote of the Day.
                        </Text>
                      </View>

                      <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: "#ffffff", padding: 10, borderRadius: 10 }}>
                        <Text style={{ fontSize: 20 }}>
                          {this.state.Quote}
                        </Text>
                      </View>
                    </View>

                  </View>

























                </View>
              </ScrollView>
            </>
          </View>
        </ImageBackground>
      </SafeAreaView >
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
  uDetail: {
    marginTop: 10,
    marginBottom: 10,
  },
  uNme: {
    fontSize: 30,
    color: "#fff"
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
    fontSize: 18,
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
  activityIndicatorStyle: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '40%',
    marginTop: "10%",

    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
