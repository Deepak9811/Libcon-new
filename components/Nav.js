import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import Home from './Home';
import Profile from './Profile';
import JavaScripts from './JavaScripts';
import ShareFun from './ShareFun';
import QrGenerator from './QrGenerator';
import DownloadImage from './DownloadImage';
import Bluetooth from './Bluetooth';
import SecondBluetooth from './SecondBluetooth';
import ReaderQr from './ReaderQr';
import Login from './Login';

export default class Nav extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Java" component={JavaScripts} />
            <Stack.Screen name="Share" component={ShareFun} />
            <Stack.Screen name="QrGenerator" component={QrGenerator} />
            <Stack.Screen name="DownloadImage" component={DownloadImage} />
            <Stack.Screen name="Blue" component={Bluetooth} />
            <Stack.Screen name="SecondBlue" component={SecondBluetooth} />
            <Stack.Screen name="ReadeQr" component={ReaderQr} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({});
