import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, StatusBar, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper'
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SelectCountry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryData: [],
            loader:true
        }
    }

    componentDidMount() {
        fetch(`https://api.printful.com/countries`, {

        }).then((result) => {
            result.json().then(resp => {
                this.setState({
                    countryData: resp.result,
                    loader:false
                })
                // console.log(resp.result)
            })
        })
    }

    async getCountry(item) {
        let countryName = item.name


        try {
            await AsyncStorage.setItem("countryName", JSON.stringify(countryName))
            const countryNam = JSON.parse(await AsyncStorage.getItem('countryName'));
            console.log(countryNam)
            this.props.navigation.push("FirstPage")
        } catch (error) {
            console.log("There is problem in AsyncStorage " + error)
        }
    }

    render() {
        return (
            <Animatable.View style={styles.container} animation="fadeInRight"
                duration={400}>
                <Appbar.Header style={{ backgroundColor: "#fff" }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} style={{ marginRight: 0 }} />
                    <Appbar.Content title="Select Country" />
                </Appbar.Header>

                {this.state.loader ? (
                    <>
                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                                position: 'absolute',
                                elevation: 5,
                                top: '50%',
                                justifyContent: 'center',
                            }}>
                            <ActivityIndicator size="large" color="#0d6efd" />
                        </View>
                    </>
                ) : null}

                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, marginTop: "0%" }}>



                        {this.state.countryData.map((item, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <View style={[styles.action]}>
                                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.getCountry(item)}>
                                            <Text style={styles.textInput}>{item.name}</Text>
                                        </TouchableOpacity>

                                    </View>


                                </React.Fragment>
                            );
                        })}


                    </View>
                </ScrollView>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff' },

    action: {
        flexDirection: 'row',
        marginTop: "4%",
        paddingLeft: "2%",
        borderBottomColor: '#f1f1f1',
        marginBottom: "2%",
        borderBottomWidth: 1,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 12,
        color: '#05375a',
        padding: "5%",
        fontSize: 16,
    },

    btn: { alignItems: "center", justifyContent: "center", width: "100%", marginTop: "60%" },
    btnT: { width: "70%", borderRadius: 50 },
})
