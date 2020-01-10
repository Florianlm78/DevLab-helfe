import React from 'react'
import {View, TextInput, Image, TouchableOpacity, Text, StyleSheet} from 'react-native'
import firebase from "firebase";
import {onLogin} from '../Auth'

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

   

    _login = (email, password) => {

        try {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(res => {
                    console.log(res.user.email);
                    onLogin(res.user.email).then(() => {
                        this.props.navigation.navigate('Main')
                    })
                })
                .catch(error => {
                    alert(error.message);
                });

        } catch (error) {
            console.log(error.toString());
        }

    };

    render(){
        return(
            <View style={{}}>
                <Image style={styles.logo}
                 source={require('../../assets/logo.png')}/>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={(email) => this.setState({email: email})}/>
                <TextInput
                    style={[styles.input, { marginTop: 30, marginBottom: 75}]}
                    placeholder='Password'
                    secureTextEntry={true}
                    password={true}
                    onChangeText={(password) => this.setState({password: password})}/>

                <TouchableOpacity
                    style={[styles.button, {marginBottom: 30}]}
                    onPress={() => this._login(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        height: 250,
        width: 250,
        marginTop: 80,
        marginBottom: 75,
        borderRadius: 25
    },
    input: {
        height: 40,
        marginLeft: 70,
        marginRight: 70,
        paddingLeft: 10,
        backgroundColor: '#b3cdfb',
        borderRadius: 25,
        fontSize: 18
    },
    button: {
        height: 42,
        backgroundColor: '#212580',
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 25
    },
    buttonText: {
        color:"white",
        textAlign: "center",
        fontSize: 18,
        marginVertical: 10
    }

});