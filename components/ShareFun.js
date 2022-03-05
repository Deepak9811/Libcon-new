import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import {Button} from 'react-native-paper';

import Share from 'react-native-share';

export default class ShareFun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareInput: '',
    };
  }

  async customShare() {
    const shareOptions = {
      message: this.state.shareInput,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('share response', JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error =>', error);
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{marginBottom: '10%'}}>
          <Text> share </Text>
        </View>

        <View style={{width: '100%', marginBottom: '10%', borderWidth: 1}}>
          <Text>input</Text>
          <TextInput
            value={this.state.shareInput}
            onChangeText={text =>
              this.setState({
                shareInput: text,
              })
            }
          />
        </View>

        <View style={{width: '100%'}}>
          <Button
            icon="share"
            mode="contained"
            color="#2193b0"
            onPress={() => this.customShare()}>
            Press me
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
