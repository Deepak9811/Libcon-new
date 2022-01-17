import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  ScrollView, Alert, ToastAndroid, Linking
} from 'react-native';

import { Appbar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'NaN',
      loader: false,
      purposeIndexValue: '',
      pickerIndex: '',
      searchMeeting: '',
      listArray: [],
      purposeData: [{ "type": "Title", id: "1" }, { "type": "Author", id: "2" }, { "type": "Publisher", id: "3" }],
      searchLoader: false,
      showSearchContent: false,
      hidePubliser: true,
      bookType: "",
      showName: true,
    };
  }

  async componentDidMount() {
    try {
      const sName = JSON.parse(await AsyncStorage.getItem('sName'));
      const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));

      const libraryID = JSON.parse(await AsyncStorage.getItem('libraryID'));
      const password = JSON.parse(await AsyncStorage.getItem('password'));
      const token = JSON.parse(await AsyncStorage.getItem('libraryToken'));
      const welcomemsg = JSON.parse(await AsyncStorage.getItem("welcomemsg"))

      this.setState({
        name: sName + ' ' + sNameLast,
        libraryCode: libraryID,
        password: password,
        token: token,
        welecomeMsg: welcomemsg,
      });

      if (sName === null) {
        console.log(sName)
        this.setState({
          showName: false
        })
      }


      // console.log('name : ', this.state.name);
    } catch (error) {
      console.log('There has problem in AsyncStorage : ' + error.message);
    }
  }

  checkCatalog() {
    if (this.state.bookType === "") {
      Alert.alert("Wrong Action", "Please Select Search Criteria.", [
        { text: 'Okay' }
      ], { cancelable: true })
    } else {
      // console.log("bookType data :---", this.state.bookType)
      this.searchVisitor()
    }
  }

  async searchVisitor(value) {
    this.setState({
      listArray: [],
    });

    if (this.state.searchMeeting.length > 0) {
      this.setState({ listArray: [], showSearchContent: false });

      this.setState({
        searchLoader: true,
      });

      // let sParameter = value;
      // sParameter = encodeURIComponent(sParameter.trim());  https://bitsomapi.libcon.in/api/getResponse?rptName=LIBCON-OPAC-${this.state.bookType}&parameter=${this.state.searchMeeting}

      fetch(
        `https://api.libcon.in/api/v1/searchItem?type=${this.state.bookType}&searchText=${this.state.searchMeeting}`,
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
        .then(data => {
          data.json().then(resp => {
            console.log('searcher =>', resp.data);

            if (resp.status === "success") {
              if (resp.data.length > 0) {
                // console.log('search =>', resp);
                this.setState({
                  listArray: resp.data,
                  showSearchContent: true,
                  searchLoader: false,
                });
              }
            } else {
              ToastAndroid.show(
                resp.message,
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              );
              this.setState({
                searchLoader: false,
              });
            }
          });
        })
        .catch(error => {
          ToastAndroid.show(
            error.message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          console.log(
            'There has been a problem with your fetch operation: ' +
            error.message,
          );
          this.setState({
            searchLoader: false,
          });
        });

      // setTimeout(() => {
      //   console.log('nothing');
      //   this.setState({
      //     searchLoader: false,
      //     message: 'Sorry, Something wents wrong .',
      //   });
      // }, 10000);

      // setTimeout(() => {
      //   console.log(this.state.listArray.length);
      //   if (this.state.listArray.length > 0) {
      //     console.log('null');
      //   } else {
      //     console.log('Sorry, the requested page is not available');
      //     this.setState({
      //       message: 'Sorry, We could not find any results for your search criteria. Please try again.',
      //       showpage: false,
      //       searchLoader: false,
      //     });
      //   }
      // }, 10000);
    } else {
      this.setState({
        showSearchContent: false,
      });
      Alert.alert("", "Please enter search text.", [{ text: "Okay" }], { cancelable: true });
    }
  }

  async getTextValue(item) {
    console.log('get item : ', item.biblionumber);
    if (item.biblionumber.length !== 0) {
      await AsyncStorage.setItem('opacNext', JSON.stringify(item.biblionumber));
      await AsyncStorage.setItem('opacNextAuthor', JSON.stringify(item.title));
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

  onPickerValue(value, index,) {

    this.state.bookType = this.state.purposeData[index - 1].type

    this.setState({
      purposeIndexValue: value,
      // bookType: this.state.purposeData[index - 1].type,
      disble: true,
    });

    // , () => {
    console.log("purpose data :---", this.state.bookType)
    // }

    // this.state.pickerIndex = index;
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.ttl}>
          <TouchableOpacity
            style={{ paddingLeft: '2%' }}
            onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="arrowleft" color="#05375a" size={25} />
          </TouchableOpacity>

          <Appbar.Content title="Search Book (OPAC)" />
        </Appbar.Header>

        {this.state.loader && (
          <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator color="#57A3FF" size="large" />
          </View>
        )}


        {this.state.searchLoader && (
          <View
            style={{
              flex: 1,
              width: '100%',
              position: 'absolute',
              elevation: 3,
              top: '45.5%',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="#0d6efd" />
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ margin: 10, marginLeft: '5%', marginRight: '5%' }}>

            {/* ===============INFO======================= */}
            <View style={styles.uDetail}>

              {this.state.showName && (
                <>
                  <Text style={styles.uNme}>Hello</Text>
                  <Text style={styles.uNme}>{this.state.name}</Text>
                </>
              )}



              <Text style={{ marginTop: 10, color: '#8A8A8A' }}>
                {this.state.welecomeMsg}
              </Text>

            </View>

            <Text style={{ marginTop: 10, color: '#8A8A8A' }}>
              Use the following form to search your library catalog.
            </Text>



            <View style={styles.pkr}>
              <SelectPicker
                style={{ width: '100%' }}
                selectedValue={this.state.purposeIndexValue}
                onValueChange={(value, index) => {
                  this.onPickerValue(value, index);
                }}>
                <SelectPicker.item
                  label="Search Criteria"
                  color="#6f6f6f"
                  value="0"
                  enabled={this.state.disble ? false : true}
                />
                {this.state.purposeData.map((item, i) => (
                  <SelectPicker.item label={item.type} color="#000" value={item.id} />
                ))}
              </SelectPicker>
            </View>

            <View style={styles.searchSt}>
              <TextInput
                placeholder="Search..."
                style={styles.searchInputStyle}
                value={this.state.searchMeeting}
                onChangeText={value => {
                  this.setState({ searchMeeting: value });
                }}
              />

            </View>

            <View style={{ marginTop: '5%' }}>
              <TouchableOpacity

                onPress={value => this.checkCatalog(value)}>
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
                    Search
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>




            {this.state.showSearchContent ? (
              <LinearGradient
                colors={['#fff', '#fff']}
                style={styles.dropdown}>
                <Text style={styles.dropdown, { color: '#8A8A8A', marginBottom: 15 }}>
                  Following is the list of titles we found based on your search criteria. You can click on individual title for a detailed view.
                </Text>



                <View
                  style={{
                    paddingTop: '5%',
                    width: '100%',
                    backgroundColor: "#eff7ee",
                    paddingLeft: "3%",
                    paddingRight: "3%",
                  }}>
                  <View style={styles.flatstyles}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View
                        style={{
                          marginTop: '1%',
                          marginBottom: '5%',
                          width: '100%',
                        }}>
                        {this.state.listArray.map((item, i) => {
                          {
                            // console.log('item =>', item.subtitle);
                            if (item.subtitle.length === 0) {
                              this.state.showitem = false

                              console.log("empty", this.state.showitem)
                            } else {
                              this.state.showitem = true
                              console.log("data", this.state.showitem)
                            }

                          }
                          return (
                            <React.Fragment key={i}>
                              <TouchableOpacity
                                style={styles.searchTextSyle}
                                value={this.state.mName}
                                onPress={() => this.getTextValue(item)}>
                                <View
                                  style={{
                                    marginBottom: 10,
                                    borderRadius: 5,
                                  }}>
                                  <LinearGradient
                                    colors={['#fff', '#fff']}
                                    style={[
                                      styles.commonGradient,
                                      {
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        borderRadius: 10,
                                      },
                                    ]}>
                                    <View
                                      style={{
                                        paddingLeft: 15,
                                        paddingRight: 5,
                                      }}>
                                      <Text style={styles.bookTitle}>
                                        {item.title}
                                      </Text>

                                      <Text style={{ display: this.state.showitem ? "flex" : "none" }}>
                                        {item.subtitle}
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
                                        <Text
                                          style={styles.bookAuther}>
                                          {item.author}
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
                                          {item.publisher}
                                        </Text>
                                      </Text>
                                    </View>
                                  </LinearGradient>
                                </View>
                              </TouchableOpacity>
                            </React.Fragment>
                          );
                        })}
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </LinearGradient>
            ) : (
              <>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10%',
                  }}>
                  <Text>{this.state.message}</Text>
                </View>
              </>
            )}

          </View>
        </ScrollView>

        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 5,
            // marginTop: '38%',
            // position: "absolute",
            // left: "30%",
            // top: "93%"
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
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
  },
  ttl: {
    backgroundColor: '#fff',
  },
  searchInputStyle: {
    flex: 1,
    width: '100%',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    margin: 0,
    color: 'black',
  },

  searchSt: {
    marginTop: 15,
    width: '100%',
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    // borderWidth: 1,
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
    fontWeight: '700',
  },
  pkr: {
    width: '100%',
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#f3f3f3',
  },

  oldBookStyle: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  currentIssuesDetailsMap: {
    fontSize: 16,
    paddingVertical: 2,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    marginTop: '10%',
    borderRadius: 5,
    marginBottom: '5%',
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
    fontSize: 15,
  },


  uDetail: {
    // marginTop: 10,
    marginBottom: 10,
  },
  uNme: {
    fontSize: 25,
  },
});