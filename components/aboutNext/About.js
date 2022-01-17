import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class about extends Component {
    constructor(props) {
        super(props)

        this.state = {
            header: '',
            image: "",
            bodyText: ""
        }
    }

    async componentDidMount() {
        try {
            const headingAbout = JSON.parse(await AsyncStorage.getItem("headingAbout"))
            const imageUrlAbout = JSON.parse(await AsyncStorage.getItem("imageUrlAbout"))
            const bodyText = JSON.parse(await AsyncStorage.getItem("bodyText"))

            this.setState({
                header: headingAbout,
                image: imageUrlAbout,
                bodyText: bodyText
            })

            console.log(this.state.bodyText)

        } catch (error) {
            console.log(error.message)
        }
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
                    <Appbar.Content title={this.state.header} />
                </Appbar.Header>

                <View style={styles.body}>
                    <Text style={{fontSize:25,fontWeight:"600",marginBottom:"6%",}}>Heading</Text>

                    <Image source={{ uri: this.state.image }} resizeMode="cover" style={{ height: 250, width: 320 ,marginBottom:"5%"}} />
                    <Text style={{fontSize:15,}}>{this.state.bodyText}</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    ttl: {
        backgroundColor: '#fff',
    },
    body: {
        marginLeft: "5%",
        marginRight: "5%",
        marginTop:"5%"
    }
})
