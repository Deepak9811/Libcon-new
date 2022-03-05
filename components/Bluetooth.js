import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  DeviceEventEmitter,
  NativeEventEmitter,
  Switch,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  Image,
  TextInput,
} from 'react-native';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';

import RNQRGenerator from 'rn-qr-generator';

var {height, width} = Dimensions.get('window');
export default class Home extends Component {
  _listeners = [];

  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      pairedDs: [],
      foundDs: [],
      bleOpend: false,
      loading: true,
      boundAddress: '',
      debugMsg: '',
    };
  }

  getTextInputValue() {
    RNQRGenerator.generate({
      value: this.state.text_input,
      height: 200,
      width: 200,
      base64: true,
    })
      .then(response => {
        const {uri, width, height, base64} = response;
        this.setState({
          base64Image: base64,
        });
        console.warn(this.state.text_input);
      })
      .catch(error => console.log('Cannot create QR code', error));
  }

  componentDidMount() {
    //alert(BluetoothManager)
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        this.setState({
          bleOpend: Boolean(enabled),
          loading: false,
        });
      },
      err => {
        err;
      },
    );

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            this._deviceAlreadPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          rsp => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: '',
              boundAddress: '',
            });
          },
        ),
      );
    } else if (Platform.OS === 'android') {
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            this._deviceAlreadPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          rsp => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: '',
              boundAddress: '',
            });
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
          () => {
            ToastAndroid.show(
              'Device Not Support Bluetooth !',
              ToastAndroid.LONG,
            );
          },
        ),
      );
    }
  }

  _deviceAlreadPaired(rsp) {
    console.warn('rsp =>' + rsp.devices);
    var ds = null;
    if (typeof rsp.devices == 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {
        console.log('error', e);
      }
    }
    if (ds && ds.length) {
      let pared = this.state.pairedDs;
      pared = pared.concat(ds || []);
      this.setState({
        pairedDs: pared,
      });
    }
  }

  _deviceFoundEvent(rsp) {
    //alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof rsp.device == 'object') {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      //alert(e.message);
      //ignore
      console.log('error', e);
    }
    //alert('f')
    if (r) {
      let found = this.state.foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function (x) {
          return x.address == r.address;
        });
        //CHECK DEPLICATED HERE...
        if (duplicated == -1) {
          found.push(r);
          this.setState({
            foundDs: found,
          });
        }
      }
    }
  }

  _renderRow(rows) {
    let items = [];
    for (let i in rows) {
      let row = rows[i];
      if (row.address) {
        items.push(
          <TouchableOpacity
            key={new Date().getTime() + i}
            style={styles.wtf}
            onPress={() => {
              this.setState({
                loading: true,
              });
              BluetoothManager.connect(row.address).then(
                s => {
                  console.warn('blue =>', row);
                  this.addBlueLocal(row);

                  this.setState({
                    loading: false,
                    boundAddress: row.address,
                    name: row.name || 'UNKNOWN',
                  });
                },
                e => {
                  this.setState({
                    loading: false,
                  });
                  alert(e);
                },
              );
            }}>
            <Text style={styles.name}>{row.name || 'UNKNOWN'}</Text>
            <Text style={styles.address}>{row.address}</Text>
          </TouchableOpacity>,
        );
      }
    }
    return items;
  }

  async addBlueLocal(row) {
    try {
      await AsyncStorage.setItem('blueName', JSON.stringify(row.name));
      await AsyncStorage.setItem('blueAddress', JSON.stringify(row.address));
      // await AsyncStorage.setItem('blueAddress', JSON.stringify(row.address));
      console.warn('row : ' + row.name, ', address : ' + row.address);
    } catch (error) {
      console.log('errro' + error);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{this.state.debugMsg}</Text>
        <Text>{JSON.stringify(this.state, null, 3)}</Text>
        <Text style={styles.title}>
          Blutooth Opended:{this.state.bleOpend ? 'true' : 'false'}{' '}
          <Text>Open BLE Before Scanning</Text>{' '}
        </Text>
        <View>
          <Switch
            value={this.state.bleOpend}
            onValueChange={v => {
              this.setState({
                loading: true,
              });
              if (!v) {
                BluetoothManager.disableBluetooth().then(
                  () => {
                    this.setState({
                      bleOpend: false,
                      loading: false,
                      foundDs: [],
                      pairedDs: [],
                    });
                  },
                  err => {
                    alert(err);
                  },
                );
              } else {
                BluetoothManager.enableBluetooth().then(
                  r => {
                    var paired = [];
                    if (r && r.length > 0) {
                      for (var i = 0; i < r.length; i++) {
                        try {
                          paired.push(JSON.parse(r[i]));
                        } catch (e) {
                          //ignore
                        }
                      }
                    }
                    this.setState({
                      bleOpend: true,
                      loading: false,
                      pairedDs: paired,
                    });
                  },
                  err => {
                    this.setState({
                      loading: false,
                    });
                    alert(err);
                  },
                );
              }
            }}
          />
          <Button
            disabled={this.state.loading || !this.state.bleOpend}
            onPress={() => {
              this._scan();
            }}
            title="Scan"
          />
        </View>
        <Text style={styles.title}>
          Connected:
          <Text style={{color: 'blue'}}>
            {!this.state.name ? 'No Devices' : this.state.name}
          </Text>
        </Text>
        <Text style={styles.title}>Found(tap to connect):</Text>

        <Text style={styles.title}>Paired:</Text>
        {this.state.loading ? <ActivityIndicator animating={true} /> : null}
        <View style={{flex: 1, flexDirection: 'column', marginBottom: '5%'}}>
          <TouchableOpacity style={{justifyContent: 'space-between'}}>
            {this._renderRow(this.state.pairedDs)}
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>new:</Text>
        {this.state.loading ? <ActivityIndicator animating={true} /> : null}
        <View style={{flex: 1, flexDirection: 'column'}}>
          {this._renderRow(this.state.foundDs)}
        </View>

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

        <View>
          <Button
            title="Second Bluetooth"
            onPress={() => this.props.navigation.push('SecondBlue')}
          />
        </View>

        <View style={styles.btn}>
          <View>
            <Image
              style={{width: 60, height: 60}}
              source={{uri: 'data:image/png;base64,' + this.state.base64Image}}
            />
          </View>

          {/* ==========QR CODE============= */}
          <View style={styles.textinput}>
            <TextInput
              value={this.state.text_input}
              onChangeText={text =>
                this.setState({
                  text_input: text,
                })
              }
              underlineColorAndroid="transparent"
              placeholder="enter your url"
            />
          </View>

          <TouchableOpacity
            onPress={() => this.getTextInputValue()}
            activeOpacity={0.7}
            style={styles.button}>
            <Text style={styles.text}>Generate</Text>
          </TouchableOpacity>

          <Image
            source={{uri: 'data:image/png;base64,' + this.state.base64Image}}
            style={styles.image}
          />

          {/* -------------------------------------------------------------------------------- */}
        </View>
      </ScrollView>
    );
  }

  _scan() {
    this.setState({
      loading: true,
    });
    BluetoothManager.scanDevices().then(
      s => {
        var ss = s;
        var found = ss.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = this.state.foundDs;
        if (found && found.length) {
          fds = found;
        }
        this.setState({
          foundDs: fds,
          loading: false,
        });
      },
      er => {
        this.setState({
          loading: false,
        });
        alert('error' + JSON.stringify(er));
      },
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  title: {
    width: width,
    backgroundColor: '#eee',
    color: '#232323',
    paddingLeft: 8,
    paddingVertical: 4,
    textAlign: 'left',
  },
  wtf: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    textAlign: 'left',
  },
  address: {
    flex: 1,
    textAlign: 'right',
  },
  button: {
    padding: 10,
    backgroundColor: 'orange',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    margin: 5,
  },
  textinput: {
    borderWidth: 1,
    marginTop: '5%',
    marginBottom: '5%',
  },
});
