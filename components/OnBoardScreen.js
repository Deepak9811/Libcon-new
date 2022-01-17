import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, StatusBar, ScrollView, BackHandler, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      countryShow: true,
      libraryShow: true
    }
  }

  async componentDidMount() {
    // await AsyncStorage.clear()
    const stateNam = JSON.parse(await AsyncStorage.getItem('stateName'));
    const library = JSON.parse(await AsyncStorage.getItem("libraryName"))

    this.state.library = library
    this.state.country = stateNam;
    console.log(this.state.library)
    console.log("world")
    if (this.state.country !== null) {
      console.log("hello")
      this.setState({
        countryShow: false
      })
    } else {
      console.log("country name", stateNam)
    }

    if (this.state.library !== null) {
      console.log("hello")
      this.setState({
        libraryShow: false
      })
    } else {
      console.log("country name", library)
    }

  }


  render() {
    return (
      <View style={styles.container}>
        <Animatable.View animation="fadeInUpBig" duration={400} >
          <StatusBar backgroundColor="#FBFBFB" barStyle="dark-content" />
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={{ margin: "5%", }}>
              <Text style={{ fontSize: 24, color: "#b03024" }}>Select your State and Library</Text>

              <TouchableOpacity style={[styles.action, { marginTop: "20%" }]} onPress={() => this.props.navigation.navigate("State")}>

                {this.state.countryShow ? (

                  <Text style={styles.textInput}>Select State/Region</Text>
                ) :
                  <Text style={styles.textInput}>{this.state.country}</Text>}
              </TouchableOpacity>


              <TouchableOpacity style={[styles.action]} onPress={() => this.props.navigation.push("Library")}>
                {this.state.libraryShow ? (
                  <Text style={styles.textInput}>Select Library</Text>
                ) :
                  <Text style={styles.textInput}>{this.state.library}</Text>}
              </TouchableOpacity>

              <View style={styles.btn} >
                <Button mode="contained" color="#f68823" style={styles.btnT} onPress={() => this.props.navigation.navigate("LogInNew")}>
                  <Text style={{ color: "#fff" }}>Next</Text>
                </Button>
              </View>

            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: "15%"
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 12,
    color: '#05375a',
    borderBottomColor: '#f1f1f1',
    paddingBottom: 5,
    borderBottomWidth: 1,
    fontSize: 16
  },

  btn: { alignItems: "center", justifyContent: "center", width: "100%", marginTop: "70%" },
  btnT: { width: "70%", borderRadius: 50 },
});
