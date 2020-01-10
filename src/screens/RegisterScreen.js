import React from 'react'
import {View, TextInput, Image, TouchableOpacity, Text, StyleSheet} from 'react-native'
import firebase from "firebase";
import {onLogin} from '../Auth'

export default class RegisterScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    _saveUserFirebase = async (user) => {

        const rootReference = firebase.database().ref();
        const usersReference = rootReference.child("users");

        firebase.auth().onAuthStateChanged(currentUser => {
            if (currentUser) {
                let newUserInstance = usersReference.child(user.uid);
                newUserInstance.set(user);
            }
        });
    };

    _signIn = (lastName, firstName, email, password) => {

        try {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(res => {
                    
                    let newUser = {
                        uid: res.user.uid,
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                    };

                    this._saveUserFirebase(newUser)
                        .then(_ => {
                            onLogin(res.user.email)
                                .then(_ => {
                                    this.props.navigation.navigate('Main')
                                })
                        });

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
            <View style={styles.container}>
                <Image style={styles.logo}
                 source={require('../../assets/logo.png')}/>
                
                <View style={styles.inputsRow}>
                    <TextInput
                        style={[styles.input, styles.inputFlex, styles.inputFlexLeft]}
                        placeholderTextColor = "#999999"
                        placeholder='Nom'
                        onChangeText={(lastName) => this.setState({lastName: lastName})}/>
                    <TextInput
                        style={[styles.input, styles.inputFlex, styles.inputFlexRight]}
                        placeholderTextColor = "#999999"
                        placeholder='Prénom'
                        onChangeText={(firstName) => this.setState({firstName: firstName})}/>
                </View>

                <TextInput
                    style={[styles.input, styles.inputFull]}
                    placeholderTextColor = "#999999"
                    placeholder='Email'
                    onChangeText={(email) => this.setState({email: email})}/>
                <TextInput
                    style={[styles.input, styles.inputFull]}
                    placeholderTextColor = "#999999"
                    placeholder='Password'
                    secureTextEntry={true}
                    password={true}
                    onChangeText={(password) => this.setState({password: password})}/>

                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => this._signIn(this.state.lastName, this.state.firstName, this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        margin: 0,
    },
    logo: {
        alignSelf: 'center',
        height: 150,
        width: 150,
        marginBottom: 20,
        marginTop: 80,
    },
    inputsRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    inputFlex: {
        flexGrow: 1,
        maxWidth: 150,
    },
    inputFlexLeft: {
        marginLeft: 30,
        marginRight: 15,
    },
    inputFlexRight: {
        marginLeft: 15,
        marginRight: 30,
    },
    inputFull: {
        marginLeft: 30,
        marginRight: 30,
    },
    input: {
        height: 40,
        paddingLeft: 10,
        backgroundColor: '#b3cdfb',
        borderRadius: 25,
        fontSize: 18,
        marginTop: 30
    },
    button: {
        height: 42,
        backgroundColor: '#212580',
        marginLeft: 100,
        marginRight: 100,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 25
    },

    buttonText: {
        color:"white",
        textAlign: "center",
        fontSize: 18,
        marginVertical: 10
    },

});