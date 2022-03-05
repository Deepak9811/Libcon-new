import React, {Component} from 'react';
import {Text, StyleSheet, View, BackHandler, Alert, Button} from 'react-native';

export default class JavaScripts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.disableBackButton(),
    );
  }

  disableBackButton() {
    Alert.alert('Exit From App', 'Do you wnat to exit from app ?', [
      {text: 'Yes', onPress: () => BackHandler.exitApp()},
      {text: 'No', onPress: () => console.warn('No Pressed')},
    ]);
    return true;
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> java </Text>

        <View style={{width: '100%'}}>
          <Button
            title="Share function"
            onPress={() => this.props.navigation.navigate('Share')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
