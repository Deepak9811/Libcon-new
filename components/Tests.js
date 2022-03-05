// // // import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
// // // import React, { Component } from 'react'
// // // import { RadioButton } from 'react-native-paper'

// // // export default class Tests extends Component {
// // //   constructor(props) {
// // //     super(props)

// // //     this.state = {
// // //       data: ["computer", "Laptop", "Mobile"],
// // //       checked: 0,
// // //       selectingData: [],
// // //       cheimg: "https://w7.pngwing.com/pngs/752/449/png-transparent-at-sign-computer-icons-radio-button-miscellaneous-monochrome-black-thumbnail.png",
// // //       unimg: "https://static.thenounproject.com/png/739877-200.png"
// // //     }
// // //   }


// // //   render() {
// // //     return (
// // //       <View style={{ flex: 1, backgroundColor: 'white' }}>
// // //         <Text style={{ marginBottom: "15%" }}>Tests</Text>
// // //         {/* <View>
// // //           <Image source={{ uri: this.state.image_Path }} style={styles.image} />
// // //         </View> */}

// // //         {this.state.data.map((data, key) => {
// // //           return (
// // //             <View>
// // //               {this.state.checked == key ?
// // //                 <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} >

// // //                   <Image style={{
// // //                     width: 20,
// // //                     height: 20,
// // //                     margin: 5,
// // //                   }} source={{ uri: this.state.cheimg }} />
// // //                   <Text>{data}</Text>
// // //                 </TouchableOpacity>
// // //                 :
// // //                 <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => this.setState({ checked: key })}>
// // //                   <Image style={{
// // //                     width: 20,
// // //                     height: 20,
// // //                     margin: 5,
// // //                   }} source={{ uri: this.state.unimg }} />
// // //                   <Text>{data}</Text>
// // //                 </TouchableOpacity>
// // //               }
// // //             </View>
// // //           )
// // //         })}


// // //       </View>
// // //     )
// // //   }
// // // }

// // // const styles = StyleSheet.create({
// // //   image: {
// // //     width: '100%',
// // //     height: 250,
// // //     resizeMode: 'contain',
// // //     margin: 5,
// // //   },

// // // })


// // // import React, { useState } from 'react';
// // // import RadioGroup from 'react-native-radio-buttons-group';

// // // const radioButtonsData = [{
// // //   id: '1', // acts as primary key, should be unique and non-empty string
// // //   label: 'Option 1',
// // //   value: 'option1'
// // // }, {
// // //   id: '2',
// // //   label: 'Option 2',
// // //   value: 'option2'
// // // }, {
// // //   id: '3',
// // //   label: 'Option 3',
// // //   value: 'option3'
// // // }]

// // // export default function App() {

// // //   const [radioButtons, setRadioButtons] = useState(radioButtonsData)

// // //   function onPressRadioButton(radioButtonsArray) {
// // //     console.log(radioButtonsArray)
// // //     setRadioButtons(radioButtonsArray);
// // //   }

// // //   return (
// // //     <RadioGroup
// // //       radioButtons={radioButtons}
// // //       onPress={onPressRadioButton}
// // //     />
// // //   );

// // // }


// // import { Text, StyleSheet, View } from 'react-native'
// // import React, { Component } from 'react'
// // import RadioGroup from 'react-native-radio-buttons-group';


// // export default class Tests extends Component {
// //   constructor(props) {
// //     super(props)

// //     this.state = {
// //       radioButtons: [
// //         {
// //           id: '1',
// //           label: 'Option 1',
// //           value: 'option1'
// //         }, {
// //           id: '2',
// //           label: 'Option 2',
// //           value: 'option2'
// //         }, {
// //           id: '3',
// //           label: 'Option 3',
// //           value: 'option3'
// //         }]
// //     }
// //   }



// //   onPressRadioButton(radioButtonsArray) {
// //     console.log(radioButtonsArray)
// //     // this.setState({
// //     //   radioButtons
// //     // })
// //     // setRadioButtons(radioButtonsArray);
// //   }

// //   render() {
// //     return (
// //       <View>
// //         <Text>Tests</Text>

// //         <RadioGroup
// //           radioButtons={this.state.radioButtons}
// //           onPress={(radioButtonsArray) => this.onPressRadioButton(radioButtonsArray)}
// //         />
// //       </View>
// //     )
// //   }
// // }

// // const styles = StyleSheet.create({})



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
import * as Animatable from 'react-native-animatable';

import StarRating from 'react-native-star-rating';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Carousel from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

import RadioGroup from 'react-native-radio-buttons-group';

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
      selectingData: [],

      checked: 0,
      checkImg: "https://www.pngfind.com/pngs/m/380-3802077_original-png-clip-art-file-selected-button-svg.png",
      unCheckImg: "https://static.thenounproject.com/png/739877-200.png",


      radioButtons: [],
      data: [],
      description: '',
      showResponse: true,
      hideFeedBack: true
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
          let FormatData = []
          const nwdatamcq = resp.data.map((item, i) => {
            if (item.mcq != null) {
              this.state.crmcq = item.mcq

              let Temp = item.mcq

              for (let i = 0; i < Temp.length; i++) {
                FormatData.push({
                  id: Temp[i].id,
                  questionId: Temp[i].questionId,
                  answer: Temp[i].answer,
                  active: Temp[i].active,
                  checked: false
                })
              }
            }
          })


          this.setState({
            data: FormatData,
            feedData: resp.data,
            mcqData: nwdatamcq,
            showFeedData: true,
          })
          console.log("nwdatamcq :- ", this.state.data)
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


  onPressRadioButton(item, i) {
    // console.log(item[0].questionId, i)

    let postFeed = this.state.radioButtons

    item.map((item, i) => {
      if (item.selected === true) {

        let strng = { questionId: item.questionId, user: this.state.email, answer: item.answer, show: item.active }

        postFeed.push(strng)
      }
    })

    let newData = ([...new Map(postFeed.map(item => [item.questionId, item])).values()])
    console.log(newData)
    this.setState({
      radioButtons: newData
    })

  }




  onStarRatingPress(rating, item) {
    console.log(rating, item.questionId, item)

    let postFeed = this.state.radioButtons

    let strng = { questionId: item.questionId, user: this.state.email, answer: rating, show: item.active }

    postFeed.push(strng)

    let newData = ([...new Map(postFeed.map(item => [item.questionId, item])).values()])
    console.log(newData)
    this.setState({
      radioButtons: newData,
      starCount: rating
    })

    // this.setState({
    //   starCount: rating
    // });
  }


  descrip(des, item) {
    console.log(des, item)

    let postFeed = this.state.radioButtons

    let strng = { questionId: item.questionId, user: this.state.email, answer: des, show: item.active }

    postFeed.push(strng)

    let newData = ([...new Map(postFeed.map(item => [item.questionId, item])).values()])
    console.log(newData)
    this.setState({
      radioButtons: newData,
      description: des
    })
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
    const { radioButtons } = this.state

    console.log(radioButtons.length)

    if (radioButtons.length != 0) {
      fetch(`https://api.libcon.in/api/v1/feedback`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "APP-TOKEN": this.state.token,
          "LIB-CODE": this.state.libraryCode
        },
        body: JSON.stringify(radioButtons)
      }).then((result) => {
        result.json().then(resp => {
          console.log("Feedback Response resp  :- ", resp)

          if (resp.status === "success") {
            // this.setState({
            //   eventData: resp.data,
            //   showEvents: true,
            // })

            this.setState({
              showFeedBack: false,
              showResponse: false
            })


            setTimeout(() => {
              this.setState({
                hideFeedBack: false
              })
            }, 3000);



          } else {
            // this.setState({
            //   showEvents: false,
            // })
          }
        })
      }).catch((error) => {
        alert(error.message)
        Alert.alert("Error!",
          "Something went wrong. Please try again.",
          [
            { text: 'Okay' },
          ],
          { cancelable: true }
        )
        // this.setState({
        //   showEvents: false,
        // })
      })
    } else {
      Alert.alert("",
        "Please select the atlest one option...",
        [
          { text: 'Okay' },
        ],
        { cancelable: true }
      )
    }




  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#895b82" barStyle="light-content" />
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
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff', marginBottom: "6%" }}></View>

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
                    {this.state.hideFeedBack ? (
                      <View style={{ marginBottom: "10%" }}>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff', }}></View>


                        <View style={{ marginBottom: "5%", marginTop: "10%" }}>
                          <Text >
                            Feedback.
                          </Text>
                        </View>

                        <View style={styles.secondContainer}>


                          <>
                            {this.state.showResponse ? (
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
                            ) : (
                              <View style={{ flexDirection: "row", padding: "5%" }}>
                                <Animatable.Text animation={'rubberBand'} style={{ fontWeight: "bold", marginRight: "4%", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "1%", fontSize: 16 }}>Thank Your For Your Feedbak.</Animatable.Text>
                                <Animatable.View style={styles.successIcon} animation={'bounceIn'}>
                                  <Feather name="check-circle" color="green" size={28} />
                                </Animatable.View>
                              </View>
                            )}
                          </>




                          {this.state.showFeedBack ? (
                            <View style={{ marginTop: "5%", marginBottom: "5%" }}>
                              {this.state.feedData.map((item, i) => {
                                { console.log("item.mcq 1 :- ", item.type) }
                                this.state.typ = item.type
                                this.state.showRate = true;

                                if (item.type === "Rate") {
                                  this.state.showRate = true;
                                  this.state.showGEN = false;
                                  console.log("Rate :- ", item.type,this.state.showRate)
                                } else if (item.type === "GEN") {
                                  this.state.showGEN = true;
                                  this.state.showRate = false;
                                  console.log("General ", item.type)
                                } else if (item.type === "Rate") {
                                  this.state.showRate = true;
                                  this.state.showGEN = false;
                                  console.log("Rate 1 :- ", item.type)
                                } else {
                                  this.state.showGEN = false;
                                  this.state.showRate = false;
                                  this.state.showOption = true
                                  // console.log("this.state.showGEN :- ", this.state.showGEN, this.state.showRate)
                                }


                                if (item.mcq != null) {
                                  if (item.mcq.length > 0) {

                                    this.state.newMcqData = item.mcq;

                                    this.state.showMcqAnswer = true

                                    this.state.showOption = true
                                  }
                                } else {
                                  this.state.newMcqData = [{ answer: "item.mcq", questionId: item.id, active: item.active }]

                                }
                                return (
                                  <React.Fragment key={i}>

                                    <View style={{ flexDirection: "row" }}>
                                      <Text>{i + 1}. </Text>
                                      <Text>{item.question}</Text>
                                    </View>

                                    <View style={{ flexDirection: "row" }}>

                                      {this.state.showOption ? (
                                        <View style={{ width: "10%" }}>
                                          <RadioGroup
                                            radioButtons={this.state.newMcqData}

                                            onPress={(radioButtonsArray, i) => this.onPressRadioButton(radioButtonsArray, i)}
                                          />
                                        </View>
                                      ) : null}

                                      {this.state.showMcqAnswer && (

                                        <View style={{ marginTop: "2%" }}>
                                          {this.state.newMcqData.map((item, key) => {
                                            // { console.log("item.answer 3 :- ", item) }
                                            this.state.showOption = true
                                            {
                                              if (item.answer === "item.mcq") {
                                                // if (this.state.typ === "Rate") {
                                                //   this.state.showRate = true;
                                                //   this.state.showGEN = false;
                                                //   console.log("Rate :- ", this.state.typ)
                                                // } else if (this.state.typ === "GEN") {
                                                //   this.state.showGEN = true;
                                                //   this.state.showRate = false;
                                                //   console.log("General ", this.state.typ)
                                                // }  else if (this.state.typ === "Rate") {
                                                //   this.state.showRate = true;
                                                //   this.state.showGEN = false;
                                                //   console.log("Rate :- ", this.state.typ)
                                                // }else {
                                                //   this.state.showGEN = false;
                                                //   this.state.showRate = false;
                                                //   this.state.showOption = true
                                                //   // console.log("this.state.showGEN :- ", this.state.showGEN, this.state.showRate)
                                                // }
                                                this.state.showOption = true
                                              } else {
                                                // console.log(this.state.typ)
                                                this.state.showOption = false;
                                              }
                                            }
                                            return (
                                              <React.Fragment key={key}>
                                                <View style={{ flexDirection: 'row' }}>

                                                  {!this.state.showOption ? (
                                                    <>
                                                      <View style={{ marginRight: '2%', marginLeft: "2%", marginBottom: "20%" }}>
                                                        <Text style={[styles.title,]}> {item.answer}</Text>
                                                      </View>

                                                    </>
                                                  ) : (
                                                    <>

                                                      


                                                      <>
                                                        {this.state.showGEN && (

                                                          <View style={[styles.textAreaContainer, { height: 150 }]} >
                                                            <TextInput
                                                              style={styles.textArea}
                                                              underlineColorAndroid="transparent"
                                                              placeholder="Description..."
                                                              placeholderTextColor="grey"
                                                              // numberOfLines={10}
                                                              multiline={true}
                                                              value={this.state.description}
                                                              onChangeText={des => this.descrip(des, item)}
                                                            />
                                                          </View>
                                                        )}
                                                      </>



                                                      <>

                                                        {this.state.showRate ? (
                                                          <View style={[styles.textAreaContainer, { borderWidth: 0 }]} >
                                                          <StarRating
                                                            disabled={false}
                                                            maxStars={5}
                                                            rating={this.state.starCount}
                                                            selectedStar={(rating) => this.onStarRatingPress(rating, item)}
                                                            fullStarColor={'#FFC300'}
                                                          />
                                                        </View>
                                                        ):null}
                                                      </>


                                                    </>
                                                  )}

                                                </View>
                                              </React.Fragment>
                                            )
                                          })}

                                        </View>
                                      )}
                                    </View>





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
                                    Submit
                                  </Text>
                                </LinearGradient>
                              </TouchableOpacity>


                            </View>
                          ) : null}

                        </View>
                      </View>


                    ) : null}
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
    // height: 150,
    paddingBottom: "10%",
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



import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Button, Checkbox, RadioButton } from 'react-native-paper'

export default class Tests extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nonFormatData: ["Horse", "Cat", "Dog", "Mouse"],
      data: [],
      //--------
      // data: [{ id: 1, key: "Mango", checked: false }, { id: 2, key: "Banana", checked: false }, { id: 3, key: "Papaya", checked: false }, { id: 4, key: "Grapes", checked: false }, { id: 5, key: "Guava", checked: false }, { id: 6, key: "Lychee", checked: false }],


      selectedFruits: []
    }
  }


  componentDidMount() {
    let Temp = this.state.nonFormatData
    let FormatData = []
    for (let i = 0; i < Temp.length; i++) {
      FormatData.push({
        id: i + 1,
        key: Temp[i],
        checked: false
      })
    }


    this.setState({
      data: FormatData
    })

    console.log("hell", FormatData)
  }



  // ----------if you don't have your data in this format
  //[id:'',key:"",checked:false/true}]
  // Try this method.

  onChecked(id) {
    const data = this.state.data
    const index = data.findIndex(x => x.id === id);
    console.log(index)
    data[index].checked = !data[index].checked
    this.setState(data)

    console.log(data)
  }

  renderFruits() {
    return this.state.data.map((item, key) => {
      console.log(item.checked)
      return (
        <TouchableOpacity key={key} style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => this.onChecked(item.id)}
        >
          <RadioButton status={item.checked ? 'checked' : 'unchecked'} onPress={() => this.onChecked(item.id)} />
          <Text style={{ fontWeight: "bold" }}>{item.key}</Text>
        </TouchableOpacity>
      )
    })
  }


  getSelectedFruits() {

    var keys = this.state.data.map((t) => t.key)
    var id = this.state.data.map((t) => t.id)
    var checks = this.state.data.map((t) => t.checked)
    let Selected = []

    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        Selected.push({ id: id[i], key: keys[i] })
      }
    }

    alert(Selected)
    console.log(Selected)
  }

  render() {
    return (
      <View>
        <Text>Tests</Text>

        {this.renderFruits()}


        <View style={{ margin: "5%" }}>
          <Button icon="camera" mode="contained" onPress={() => this.getSelectedFruits()}>
            Open Basket
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({})