import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

import {
  BluetoothEscposPrinter,
  BluetoothManager,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';

export default class SecondBluetooth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      pairedDs: [],
      foundDs: [],
      bleOpend: false,
      loading: false,
      boundAddress: '',
      debugMsg: '',
    };
  }

  async componentDidMount() {
    try {
      const blueName = JSON.parse(await AsyncStorage.getItem('blueName'));
      const blueAddress = JSON.parse(await AsyncStorage.getItem('blueAddress'));
      console.warn('blue Name =>', blueName, ', blueAddress : ' + blueAddress);

      this.setState({
        boundAddress: blueAddress,
        name: blueName,
      });

      console.log(
        'blue => ',
        this.state.name,
        ' address',
        this.state.boundAddress,
      );
    } catch (error) {
      console.log('errro :' + error);
    }
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>

        <View style={{marginBottom: '5%', marginTop: '5%'}}>
          <Button
            disabled={this.state.loading || this.state.boundAddress.length <= 0}
            title="Print Receipt"
            onPress={async () => {
              try {
                await BluetoothEscposPrinter.printerInit();
                await BluetoothEscposPrinter.printerLeftSpace(0);

                await BluetoothEscposPrinter.printerAlign(
                  BluetoothEscposPrinter.ALIGN.CENTER,
                );
                await BluetoothEscposPrinter.setBlob(0);
                await BluetoothEscposPrinter.printText(
                  'Ashoka University - Day Visitor\r\n',
                  {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 3,
                    heigthtimes: 3,
                    fonttype: 1,
                  },
                );
                await BluetoothEscposPrinter.printText('\r\n', {});
                await BluetoothEscposPrinter.printerAlign(
                  BluetoothEscposPrinter.ALIGN.LEFT,
                );

                let columnWidths = [8, 20];

                await BluetoothEscposPrinter.printColumn(
                  columnWidths,
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                  ],
                  ['Name :', 'Vijender Pandita'],
                  {},
                );

                await BluetoothEscposPrinter.printColumn(
                  columnWidths,
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                  ],
                  ['Date :', '10-Oct-2021'],
                  {},
                );
                await BluetoothEscposPrinter.printText(
                  '-------------------------------------------\r\n',
                  {},
                );
                await BluetoothEscposPrinter.printerAlign(
                  BluetoothEscposPrinter.ALIGN.CENTER,
                );
                await BluetoothEscposPrinter.printText('V210726345\r\n', {});
                await BluetoothEscposPrinter.printPic(this.state.base64Image, {
                  width: 300,
                  left: 100,
                });
                await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
              } catch (e) {
                alert(e.message || 'ERROR');
              }
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
