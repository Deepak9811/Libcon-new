import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  BackHandler, Alert, ActivityIndicator, Dimensions, Image, ImageBackground, TextInput
} from 'react-native';

import { Appbar, RadioButton } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';

import StarRating from 'react-native-star-rating';

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
      profileName: "",
      accountName: "",
      aboutName: "",
      opacName: "",
      eResourceName: "",
      contactName: "",
      eventData: [],
      showEvents: false,
      showFeedBack: false,
      checked: false,
      showFeedData: false,
      feedData: [],
      showRate: false,
      starCount: 3,
      selectingData: []
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
      // console.log("homeSetting :- ", homeSetting)

      this.setState({
        name: sName + ' ' + sNameLast,
        id: userId,
        email: email,


        libraryCode: libraryID,
        password: password,
        token: token,
        welecomeMsg: welcomemsg,
        homeSetting: homeSetting,

        profileName: homeSetting[1].code,
        accountName: homeSetting[2].code,
        aboutName: homeSetting[6].code,
        opacName: homeSetting[3].code,
        eResourceName: homeSetting[4].code,
        contactName: homeSetting[5].code,
      });


      if (sName === null) {
        console.log(sName)
        this.setState({
          showName: false
        })
      }

      // console.log('profileName : ', this.state.profileName, ' accountName : ', this.state.accountName, ' aboutName : ', this.state.aboutName, ' opacName : ', this.state.opacName, ' eResourceName : ', this.state.eResourceName, ' contactName : ', this.state.contactName);
    } catch (error) {
      console.log('There has problem in AsyncStorage : ' + error.message);
    }


    this.getSliderData();
    this.getQuote();
    this.getEventDetails();
    this.getFeedQnA();
  }

  getEventDetails() {
    console.log("hello")
    fetch(`https://api.libcon.in/api/v1/getEvent`, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "content-type": "application/json",
        "APP-TOKEN": this.state.token,
        "LIB-CODE": this.state.libraryCode
      }
    }).then((result) => {
      result.json().then(resp => {
        // console.log("resp event details :- ", resp)
        if (resp.status === "success") {
          this.setState({
            eventData: resp.data,
            showEvents: true,
          })
        } else {
          this.setState({
            showEvents: false,
          })
        }
      })
    }).catch((error) => {
      console.log(error.message)
      this.setState({
        showEvents: false,
      })
    })
  }


  getFeedQnA() {
    fetch(`https://api.libcon.in/api/v1/getQuestions`, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "content-type": "application/json",
        "APP-TOKEN": this.state.token,
        "LIB-CODE": this.state.libraryCode
      }
    }).then((result) => {
      result.json().then(resp => {
        // console.log("resp FeedBack details :- ", resp.data)
        if (resp.status === "success") {



          const nwdatamcq = resp.data.map((item, i) => {
            return (
              this.state.crmcq = item.mcq
            )
          })

          this.setState({
            feedData: resp.data,
            mcqData: nwdatamcq,
            showFeedData: true,
          })

          console.log("nwdatamcq :- ", this.state.mcqData)

        } else {
          this.setState({
            showFeedData: false,
          })
        }
      })
    }).catch((error) => {
      console.log(error.message)
    })
  }



  onStarRatingPress(rating) {
    console.log(rating)
    this.setState({
      starCount: rating
    });
  }



  // backButton() {
  //   BackHandler.addEventListener(
  //     'hardwareBackPress',

  //     this.disableBackButton(),
  //   );
  // }

  // componentWillUnmount() {
  //   if (this.state.sName !== null && this.state.email !== null) {
  //     console.log("Not Possible")
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',

  //       this.disableBackButton(),
  //     );
  //   } else {
  //     console.log("Go Back is possible")
  //   }
  // }

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



  getEvent(item) {
    this.props.navigation.navigate("EventDetails", { eventDetails: item })
  }


  showFeed() {
    this.setState({ showFeedBack: true });
    console.log("show feed")
  }

  HideFeed() {
    this.setState({ showFeedBack: false });
    console.log("hide feed")

  }

  selectAnItem(item, i) {
    console.log("selecting data :- ", item, i)



    let helperArray = this.state.selectingData;
    let itemIndex = helperArray.indexOf(item.answer)

    if (helperArray.includes(item.answer)) {
      helperArray.splice(itemIndex, 1)
    } else {
      helperArray.push(item.answer, item.id)
    }

    this.setState({
      selectingData: helperArray
    })
    console.log("selecting data :- ", helperArray)
    // this.setState({
    //   checked: true
    // })
  }


  postFeedBack() {
    const { selectingData } = this.state
    fetch(`https://api.libcon.in/api/v1/feedback`, {
      method: 'POST',
      headers: {
        Accepts: "application/json",
        "content-type": "application/json",
        "APP-TOKEN": this.state.token,
        "LIB-CODE": this.state.libraryCode
      },
      body: JSON.stringify({
        questionId: 5,
        user: "rishab@gmail.com",
        answer: selectingData,
        show: true

      })
    }).then((result) => {
      result.json().then(resp => {
        console.log("Feedback Response resp  :- ", resp)
        // if (resp.status === "success") {
        //   this.setState({
        //     eventData: resp.data,
        //     showEvents: true,
        //   })
        // } else {
        //   this.setState({
        //     showEvents: false,
        //   })
        // }
      })
    }).catch((error) => {
      console.log(error.message)
      this.setState({
        showEvents: false,
      })
    })
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
                        <Text style={[styles.uNme, { width: '70%', color: "#fff" }]}>Hello</Text>
                        <TouchableOpacity
                          onPress={() => this.logOut()}
                          style={{
                            justifyContent: 'center',
                            flex: 1,
                            alignItems: 'center',
                            borderRadius: 5,
                          }}>
                          <View style={{ flexDirection: 'row', marginLeft: 10, }}>
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
                              {this.state.profileName}
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
                              {this.state.accountName}
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
                            {this.state.aboutName}
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
                            {this.state.opacName}
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
                            {this.state.eResourceName}
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
                            {this.state.contactName}
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
                          itemWidth={150}
                        />
                      </View>

                    ) : <View style={styles.activityIndicatorStyle}>
                      <ActivityIndicator color="#57A3FF" size="large" />
                    </View>
                    }


                    {/* --------------------ALL-EVENTS------------------------------- */}
                    {this.state.showEvents && (

                      <View style={{ marginBottom: "10%" }}>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff', }}></View>


                        <View style={{ marginBottom: "5%", marginTop: "10%" }}>
                          <Text >
                            Latest Events.
                          </Text>
                        </View>

                        <View style={styles.secondContainer}>

                          {this.state.eventData.map((item, i) => {
                            return (
                              <React.Fragment key={i}>

                                <TouchableOpacity onPress={() => this.getEvent(item)}>

                                  <LinearGradient
                                    colors={['#fce5e5', '#f5ddde']}
                                    style={[{ marginTop: "3%", marginBottom: "3%", borderRadius: 8, padding: 8 }]}>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>


                                      <View style={{ width: "70%", justifyContent: "center" }}>
                                        <Text style={[{ color: '#3860cc', marginLeft: 20, alignItems: "center", justifyContent: "center" }]}>
                                          {item.eventName}
                                        </Text>
                                      </View>

                                      <View style={{ marginRight: 20 }}>
                                        <Image style={{ width: 50, height: 50, borderRadius: 50, }} source={{ uri: item.image }} />
                                      </View>
                                    </View>
                                  </LinearGradient>
                                </TouchableOpacity>



                              </React.Fragment>
                            )
                          })}
                        </View>
                      </View>
                    )}




                    {/* --------------------FeedBack------------------------------- */}
                    {/* {this.state.showEvents && ( */}

                    <View style={{ marginBottom: "10%" }}>
                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff', }}></View>


                      <View style={{ marginBottom: "5%", marginTop: "10%" }}>
                        <Text >
                          Feedback.
                        </Text>
                      </View>

                      <View style={styles.secondContainer}>

                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

                          <View style={{ justifyContent: "center" }}>
                            <Text style={[{ marginLeft: 10, alignItems: "center", fontSize: 18 }]}>
                              Feedback
                            </Text>
                          </View>

                          {this.state.showFeedBack ? (
                            <TouchableOpacity
                              style={styles.rightIcon}
                              onPress={() => this.HideFeed()}>
                              <Feather
                                name="chevron-up"
                                color="#5ec6e9"
                                size={25}
                                style={[styles.rightM]}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={styles.rightIcon}
                              onPress={() => this.showFeed()}>
                              <Feather
                                name="chevron-down"
                                color="#3860cc"
                                size={25}
                                style={[styles.rightM]}
                              />
                            </TouchableOpacity>
                          )}



                        </View>
                        {this.state.showFeedBack ? (
                          <View style={{ marginTop: "5%", marginBottom: "5%" }}>
                            {this.state.feedData.map((item, i) => {
                              // { console.log("item.mcq 1 :- ", item) }
                              this.state.typ = item.type
                              if (item.mcq != null) {
                                if (item.mcq.length > 0) {
                                  // console.log("item.mcq.length 2 :- ", item.mcq.length)
                                  this.state.newMcqData = item.mcq,
                                    // 
                                    this.state.showMcqAnswer = true
                                }
                              } else {
                                this.state.newMcqData = [{ answer: "item.mcq" }]
                              }
                              return (
                                <React.Fragment key={i}>

                                  <View style={{ flexDirection: "row" }}>
                                    <Text>{i + 1}. </Text>
                                    <Text>{item.question}</Text>
                                  </View>

                                  {this.state.showMcqAnswer && (

                                    <View style={{ marginTop: "2%" }}>
                                      {this.state.newMcqData.map((item, i) => {
                                        // { console.log("item.answer 3 :- ", this.state.newMcqData) }
                                        {
                                          if (item.answer === "item.mcq") {
                                            if (this.state.typ === "RATE") {
                                              this.state.showRate = true;
                                              this.state.showGEN = false;
                                              // console.log("Rate :- ", this.state.showRate)
                                            } else if (this.state.typ === "GEN") {
                                              this.state.showGEN = true;
                                              this.state.showRate = false;
                                              // console.log("General ", this.state.showGEN)
                                            } else {
                                              this.state.showGEN = false;
                                              this.state.showRate = false;
                                              // console.log("this.state.showGEN :- ", this.state.showGEN, this.state.showRate)
                                            }

                                            this.state.showOption = true

                                          } else {
                                            // console.log(this.state.typ)
                                            this.state.showOption = false;
                                          }
                                        }
                                        return (
                                          <React.Fragment key={i}>
                                            <View style={{ flexDirection: 'row' }}>

                                              {!this.state.showOption ? (
                                                <>
                                                  <View style={{ marginRight: '2%', marginLeft: "2%", }}>
                                                    <RadioButton
                                                      status={this.state.selectingData.includes(item.answer) ? 'checked' : 'unchecked'}
                                                      onPress={() => this.selectAnItem(item, i)}
                                                    />
                                                  </View>

                                                  <View style={{ marginTop: "2%" }}>
                                                    <TouchableOpacity onPress={() => this.selectAnItem(item, i)}>
                                                      <Text style={[styles.title,]} >
                                                        {item.answer}
                                                      </Text>
                                                    </TouchableOpacity>

                                                  </View>
                                                </>
                                              ) : (
                                                <>

                                                  {this.state.showRate && (

                                                    <View style={[styles.textAreaContainer, { borderWidth: 0 }]} >
                                                      <StarRating
                                                        disabled={false}
                                                        maxStars={5}
                                                        rating={this.state.starCount}
                                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                        fullStarColor={'#FFC300'}
                                                      />
                                                    </View>
                                                  )}

                                                  {this.state.showGEN && (
                                                    <View style={styles.textAreaContainer} >
                                                      <TextInput
                                                        style={styles.textArea}
                                                        underlineColorAndroid="transparent"
                                                        placeholder="Description..."
                                                        placeholderTextColor="grey"
                                                        numberOfLines={10}
                                                        multiline={true}
                                                      />
                                                    </View>
                                                  )}


                                                </>
                                              )}

                                            </View>
                                          </React.Fragment>
                                        )
                                      })}

                                    </View>
                                  )}





                                </React.Fragment>
                              )
                            })}


                            <TouchableOpacity
                              style={styles.button}
                              onPress={() => this.postFeedBack()}>
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
                                  Send
                                </Text>
                              </LinearGradient>
                            </TouchableOpacity>




                          </View>
                        ) : null}

                      </View>
                    </View>
                    {/* )} */}


                    {/* ------------------Quote----------------------------- */}

                    <View style={{ marginBottom: "20%" }}>
                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff', }}></View>


                      <View style={{ marginBottom: "5%", marginTop: "10%" }}>
                        <Text >
                          Quote of the Day.
                        </Text>
                      </View>

                      <View style={styles.secondContainer}>




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
  secondContainer: {
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10
  },
  textAreaContainer: {
    marginLeft: "5%",
    paddingRight: "2%",
    borderColor: "#D8D8D8",
    borderWidth: 1,
    padding: 5,
    width: "90%",
    borderRadius: 5,
    marginBottom: "5%"
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
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
