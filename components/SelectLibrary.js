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
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Picker as SelectPicker} from '@react-native-picker/picker';
import Entypo from 'react-native-vector-icons/Entypo';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      purposeValue: '',
      purposeIndexValue: '',
      check_textInputChange: false,
      secureTextEntry: true,
      libraryList: [
        ' Books and Beyond Library',
        'Books Junction',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
        'Reading Room Library',
      ],
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

  render() {
    return (
      <SafeAreaProvider style={styles.container}>
        <StatusBar backgroundColor="#FFAD4B" barStyle="light-content" />
        <Animatable.View style={styles.header} animation="fadeInUpBig">
          <Image
            source={require('./image/reading.png')}
            style={{width: '80%', height: 200}}
          />
        </Animatable.View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">

          {/* ------------Password------------- */}
          <Text style={[styles.text_footer, {marginTop: 20}]}>
            {' '}
            Select Library{' '}
          </Text>
          <View style={styles.searchSt}>
            <TextInput
              placeholder="Search..."
              // placeholderTextColor="#696969"
              style={styles.searchInputStyle}
            />
            {/* <Entypo
              name="chevron-down"
              size={25}
              color="#696969"
              style={styles.iconStyle}
            /> */}
          </View>

          <ScrollView style={{marginTop: 20,marginBottom:"92%"}} showsVerticalScrollIndicator={false}>
            {this.state.libraryList.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.push("LogInNew")}>
                    <LinearGradient
                      colors={['#fe8c00', '#fe8c00']}
                      style={styles.signIn}>
                      <View style={{flexDirection: 'row', marginLeft: 10}}>
                        <Image
                          source={require('./image/reading.png')}
                          style={{width: '10%', height: 30, borderRadius: 50}}
                        />

                        <Text
                          style={[
                            styles.textSign,
                            {
                              color: '#fff',fontFamily:'Inconsolata-Light'
                            },
                          ]}>
                          {item}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </React.Fragment>
              );
            })}
          </ScrollView>
        </Animatable.View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFAD4B',
  },
  header: {justifyContent: 'center', alignItems: 'center', marginBottom: 10},
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop:5
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
    borderBottomColor: '#f2f2f2',
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
    marginTop: 10,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchSt: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    // borderWidth: 1,
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
  iconStyle: {
    paddingTop: 15,
    marginHorizontal: 10,
  },
});
