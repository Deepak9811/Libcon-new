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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Appbar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';

import RNFetchBlob from 'rn-fetch-blob';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'NaN',
      validUpto: 'NaN',
      userData: [],
      userMemberShip: 'NaN',
      userGender: 'Gender',
      currentIssued: [],
      oldIssued: [],
      loader: true,
      showCurrentBook: false,
      showOldBook: false,
      email: '',
      name: '',
      id: '',
      mssage: '',
      pmssage: '',
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
            // console.log('userAddress : ', resp.data);
  
            if (resp.length !== 0) {
              this.setState({
                userData: resp.data,
                userName: resp.data.fName + ' ' + resp.data.lName,
                userEmail: resp.data.email,
                userMemberShip: resp.data.memberId,
                validFrom: resp.data.validFrom,
                validUpto: resp.data.validUpto,
              });


              // console.log(this.state.userData.fName.length)
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
          console.log(error.message)
          // Alert.alert('Error', error.message, [{ text: 'Okay' }]);
        });

        this.currentIssuedBook();

  }

  currentIssuedBook() {
    console.log("check id:0------------", this.state.id);
    fetch(
      `https://api.libcon.in/api/v1/currIssue?id=${this.state.id}`,
      {
        method: 'GET',
        headers: {
          Accepts: 'application/json',
          'content-type': 'application/json',
          "LIB-CODE": this.state.libraryCode,
          "APP-TOKEN": this.state.token
        },
      },
    )
      .then(result => {
        result.json().then(resp => {
          // console.log('resp current book : ', resp.data);
          if (resp.status === "success") {
            if (resp.data.length > 0) {
              this.setState({
                currentIssued: resp.data,
              });
              console.log("this.state.currentIssued :- ",this.state.currentIssued)
            }
          } else {
            // console.log('message : There have no current issued books.');
            this.setState({
              mssage: 'There has no current issued books.',
              showEmpty: true,
            });
          }
        });
      })
      .catch(error => {
        this.setState({
          loader: false,
        });
        Alert.alert('Error', error, [{ text: 'Okay' }]);
      });


      this.oldIssuedBook();

  }

  oldIssuedBook() {
    console.log(this.state.id);
    fetch(
      `https://api.libcon.in/api/v1/prevIssue?id=${this.state.id}`,
      {
        method: 'GET',
        headers: {
          Accepts: 'application/json',
          'content-type': 'application/json',
          "LIB-CODE": this.state.libraryCode,
          "APP-TOKEN": this.state.token
        },
      },
    )
      .then(result => {
        result.json().then(resp => {
          // console.log('oldIssuedBook : ', resp.data);

          if (resp.status === "success") {
            if (resp.data.length > 0) {
              this.setState({
                oldIssued: resp.data,

                loader: false,
              });
              // console.log(this.state.oldIssued)
            }
          } else {
            // console.log('message : There have no previously issued books.');
            this.setState({
              pmssage: 'There has no previously issued books.',
              showEmpty: true,
              loader: false,
            });
          }

        });
      })
      .catch(error => {
        this.setState({
          loader: false,
        });
        Alert.alert('Error', error, [{ text: 'Okay' }]);
      });

    setTimeout(() => {
      console.log("this.state.userData.length :----", this.state.userData.fName.length);
      if (this.state.userData.fName.length > 0) {
        this.setState({
          showpage: true,
          loader: false,
        });
      } else {
        this.setState({
          message: 'Sorry, the requested page is not available',
          showpage: false,
          loader: false,
        });
      }
    }, 5000);
  }

  showCBook() {
    this.setState({ showCurrentBook: true });
  }

  HideCBook() {
    this.setState({ showCurrentBook: false });
  }

  showOldBooks() {
    this.setState({ showOldBook: true });
  }

  HideOldBook() {
    this.setState({ showOldBook: false });
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
          <Appbar.Content title="Your Account Details" />
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
                          {/* <TouchableOpacity style={styles.rightIcon}>
                        <Feather
                          name="chevron-right"
                          color="#5ec6e9"
                          size={20}
                          style={styles.rightM}
                        />
                      </TouchableOpacity> */}
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
                          {/* <TouchableOpacity style={styles.rightIcon}>
                        <Feather
                          name="chevron-right"
                          color="#5ec6e9"
                          size={20}
                          style={styles.rightM}
                        />
                      </TouchableOpacity> */}
                        </View>
                      </View>
                    </LinearGradient>

                    {/* ================Current Issued Books====================== */}
                    <LinearGradient
                      colors={['#f7fcff', '#f7fcff']}
                      style={[styles.commonGradient]}>
                      <View>
                        {/* <Text style={styles.text_footer}>Current Issued Books :</Text> */}

                        <TouchableOpacity
                          onPress={() => this.showCBook()}
                          style={[
                            styles.editInfo,
                            { marginTop: '5%', marginBottom: '5%' },
                          ]}>
                          <View style={styles.iconC}>
                            <AntDesign name="book" color="#3860cc" size={20} />
                          </View>
                          <View>
                            <Text
                              style={[styles.fillDetails, { color: '#3860cc' }]}>
                              Current Issued Books
                            </Text>
                          </View>
                          {this.state.showCurrentBook ? (
                            <TouchableOpacity
                              style={styles.rightIcon}
                              onPress={() => this.HideCBook()}>
                              <Feather
                                name="chevron-up"
                                color="#5ec6e9"
                                size={25}
                                style={styles.rightM}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={styles.rightIcon}
                              onPress={() => this.showCBook()}>
                              <Feather
                                name="chevron-down"
                                color="#3860cc"
                                size={25}
                                style={styles.rightM}
                              />
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>

                        {this.state.showCurrentBook ? (
                          <View
                            style={{
                              marginTop: '5%',
                              paddingRight: 10,
                              marginBottom: '1%',
                            }}>
                            {this.state.showEmpty ? (
                              <>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '5%',
                                  }}>
                                  <Text>{this.state.mssage}</Text>
                                </View>
                              </>
                            ) : null}
                            {this.state.currentIssued.map((item, i) => {
                              {console.log(item.item.title)}
                              return (
                                <React.Fragment key={i}>
                                  <>
                                    <View
                                      style={{
                                        marginBottom: 10,
                                        borderRadius: 5,
                                      }}>
                                      <LinearGradient
                                        colors={['#fff', '#fff']}
                                        style={[
                                          styles.commonGradient,
                                          { paddingTop: 10, paddingBottom: 10 },
                                        ]}>
                                        <View
                                          style={{
                                            paddingLeft: 15,
                                            paddingRight: 5,
                                          }}>
                                          <Text style={styles.bookTitle}>
                                            {item.item.title}
                                          </Text>
                                        </View>

                                        <View
                                          style={[
                                            styles.oldBookStyle,
                                            { marginTop: 10 },
                                          ]}>
                                          <Text
                                            style={
                                              styles.currentIssuesDetailsMap
                                            }>
                                            By :{' '}
                                            <Text style={styles.bookAuther}>
                                              {item.item.author}
                                            </Text>
                                          </Text>
                                        </View>

                                        <View style={styles.oldBookStyle}>
                                          <Text
                                            style={
                                              styles.currentIssuesDetailsMap
                                            }>
                                            Publisher :{' '}
                                            <Text
                                              style={{
                                                width: '60%',
                                                marginTop: 5,
                                              }}>
                                              {item.item.publisher}
                                            </Text>
                                          </Text>
                                        </View>

                                        <View style={styles.oldBookStyle}>
                                          <Text
                                            style={
                                              styles.currentIssuesDetailsMap
                                            }>
                                            Issued on :{' '}
                                            <Text
                                              style={{
                                                width: '100%',
                                                marginTop: 5,
                                              }}>
                                              {item.issuedate}
                                            </Text>
                                          </Text>
                                        </View>

                                        <View style={styles.oldBookStyle}>
                                          <Text
                                            style={
                                              styles.currentIssuesDetailsMap
                                            }>
                                            Please return by :{' '}
                                            <Text
                                              style={{
                                                width: '100%',
                                                marginTop: 5,
                                              }}>
                                              {item.duedate.slice(0, 16)}
                                            </Text>
                                          </Text>
                                        </View>


                                      </LinearGradient>
                                    </View>
                                  </>
                                </React.Fragment>
                              );
                            })}
                          </View>
                        ) : null}
                      </View>
                    </LinearGradient>

                    {/* =======================Old Issued============================= */}

                    <LinearGradient
                      colors={['#eff7ee', '#eff7ee']}
                      style={[styles.commonGradient]}>
                      <View>
                        {/* <Text style={styles.text_footer}>Old Issued :</Text> */}

                        <TouchableOpacity
                          onPress={() => {
                            this.showOldBooks();
                          }}
                          style={[
                            styles.editInfo,
                            { marginTop: '5%', marginBottom: '5%' },
                          ]}>
                          <View style={styles.iconC}>
                            <AntDesign name="book" color="#77aa69" size={20} />
                          </View>
                          <View>
                            <Text
                              style={[styles.fillDetails, { color: '#77aa69' }]}>
                              Previously Issued Books
                            </Text>
                          </View>
                          {this.state.showOldBook ? (
                            <TouchableOpacity
                              style={styles.rightIcon}
                              onPress={() => this.HideOldBook()}>
                              <Feather
                                name="chevron-up"
                                color="#77aa69"
                                size={25}
                                style={styles.rightM}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={styles.rightIcon}
                              onPress={() => this.showOldBooks()}>
                              <Feather
                                name="chevron-down"
                                color="#77aa69"
                                size={25}
                                style={styles.rightM}
                              />
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>

                        {this.state.showOldBook ? (
                          <View
                            style={{
                              marginTop: '2%',
                              paddingRight: 10,
                              marginBottom: '1%',
                            }}>
                            {this.state.showEmpty ? (
                              <>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '2%',
                                  }}>
                                  <Text>{this.state.pmssage}</Text>
                                </View>
                              </>
                            ) : null}

                            {this.state.oldIssued.map((item, i) => {
                              // console.log('item : ', item[3].slice(0, 16));
                              return (
                                <React.Fragment key={i}>
                                  <>
                                    <View
                                      style={{
                                        marginBottom: 10,
                                        borderRadius: 5,
                                      }}>
                                      <LinearGradient
                                        colors={['#fff', '#fff']}
                                        style={[
                                          styles.commonGradient,
                                          { paddingTop: 10, paddingBottom: 10 },
                                        ]}>
                                        <View
                                          style={{
                                            paddingLeft: 15,
                                            paddingRight: 5,
                                          }}>
                                          <Text style={styles.bookTitle}>
                                            {item.item.title}
                                          </Text>
                                        </View>

                                        <View
                                          style={[
                                            styles.oldBookStyle,
                                            { marginTop: 10 },
                                          ]}>
                                          <Text
                                            style={
                                              styles.currentIssuesDetailsMap
                                            }>
                                            By :{' '}
                                            <Text style={styles.bookAuther}>
                                              {item.item.author}
                                            </Text>
                                          </Text>
                                        </View>

                                        <View style={styles.oldBookStyle}>
                                          <Text
                                            style={
                                              styles.currentIssuesDetailsMap
                                            }>
                                            Publisher :{' '}
                                            <Text
                                              style={{
                                                width: '60%',
                                                marginTop: 5,
                                              }}>
                                              {item.item.publisher}
                                            </Text>
                                          </Text>
                                        </View>

                                        <View style={styles.oldBookStyle}>
                                          <Text
                                            style={
                                              styles.currentIssuesDetailsMap
                                            }>
                                            Issued on :{' '}
                                            <Text
                                              style={{
                                                width: '100%',
                                                marginTop: 5,
                                              }}>
                                              {item.issuedate}
                                            </Text>
                                          </Text>
                                        </View>
                                        <View style={styles.oldBookStyle}>
                                          <Text
                                            style={
                                              styles.currentIssuesDetailsMap
                                            }>
                                            Please return by :{' '}
                                            <Text
                                              style={{
                                                width: '100%',
                                                marginTop: 5,
                                              }}>
                                              {item.duedate.slice(0, 16)}
                                            </Text>
                                          </Text>
                                        </View>
                                      </LinearGradient>
                                    </View>
                                  </>
                                </React.Fragment>
                              );
                            })}
                          </View>
                        ) : null}
                      </View>
                    </LinearGradient>

                    {/* ============================================== */}
                    <View style={{ marginTop: '5%' }}>
                      <Text style={{ color: '#8A8A8A' }}>
                        These details are taken from your existing Account with
                        the Library. In case of any concerns, please contact the
                        helpdesk at the Library.
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
    fontWeight: '700',
  },
  rightIcon: {
    marginTop: 2,
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
    marginBottom: 20,
  },
  uNme: {
    fontSize: 30,
  },
  currentIssuesDetails: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    fontSize: 15,
    paddingVertical: 15,
    // borderRightWidth: 1,

    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  currentIssuesDetailsMap: {
    fontSize: 16,
    paddingVertical: 2,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oldBookStyle: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderBottomColor: '#fff',
    // paddingBottom: 5,
    // marginBottom: 5,
    paddingRight: 10,
  },
  bookTitle: {
    width: '100%',
    marginTop: 5,
    fontSize: 17,
    color: '#005580',
    fontWeight: '700',
  },
  bookAuther: {
    width: '60%',
    marginTop: 5,
    fontSize: 16,
  },
});
