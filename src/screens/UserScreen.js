import React from "react"
import {StyleSheet, Button, Text, View, Image, TouchableOpacity} from "react-native";
import firebase from "firebase";
import {onSignOut} from "../Auth";
import {RegisterScreen} from "../screens/RegisterScreen";
import { AuthSession } from "expo";
import { State } from "react-native-gesture-handler";

export default class UserScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            user: null,
        };
    }
    


    _logout = () => {
        try {
            firebase.auth()
                .signOut()
                .then(_ => {
                    onSignOut()
                        .then(_ => {
                            this.props.navigation.navigate('Default')
                        })
                        .catch(error => {
                            console.log(error.message)
                        });
                }).catch(error => {
                    alert(error.message);
                });


        } catch (error) {
            console.log(error.toString());
        }
    };

    componentDidMount = () => {
        // Retrieve the current user
        firebase.auth().onAuthStateChanged(user => {
            console.log(user.lastLoginAt)
            if(user) {
                user.updateProfile({
                    displayName: 'Florian LE MOAL'
                })
                console.log(user.displayName)
                
                this.setState({
                    user: user,
                    
                });
            }
        });

    };

    render(){

       

        return(
         <View style={[styles.container]}>
            
                <Image style={styles.user}
                 source={require('../../assets/user.png')}/>

                <View style={styles.inputsRow}>
                    <Text style={[styles.nom]}>{this.state.user ? this.state.user.displayName : ''}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, {marginBottom: 30}]}
                    onPress={() => this._logout()}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
                <View style={styles.inputsModify}>
                    <Text style={styles.modifMail}>{this.state.user ? this.state.user.email : ''}</Text>
                    <Button title="Modifier"></Button>
                </View>

                <View style={styles.inputsModify}>
                    <Text style={styles.modifMail}>xxxxxxxxxxxxxxxx</Text>
                    <Button title="Modifier"></Button>
                </View>

                <View style={styles.inputsModify}>
                    <Text style={styles.modifMail}>+33 643565490</Text>
                    <Button title="Modifier"></Button>
                </View>

                <View style={styles.inputsModify}>
                    <Text style={styles.modifMail}>Carte d'identité</Text>
                    <Button title="Modifier"></Button>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },

    user: {
        height: 150,
        width: 150,
        alignSelf: "center",
        marginTop: 50,
    },

    button: {
        height: 42,
        backgroundColor: '#212580',
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 25,
        marginTop: 30,
    },

    buttonText: {
        color:"white",
        textAlign: "center",
        fontSize: 18,
        marginVertical: 10,
    },

    nom: {
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 24,
        marginRight: 5,
    },

    prenom: {
        fontWeight: "bold",
        marginTop: 10,
        display: "flex",
        justifyContent: "space-around",
        fontSize: 24,
        marginLeft: 5,

    },

    modifMail: {
        fontWeight: "200",
        fontSize: 18,
        paddingRight: 60,
        marginTop: 8,
    },

    modif: {
        fontWeight: "200",
        marginTop: 30,
        fontSize: 18,
    },


    inputsRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },

    inputsModify: {
        display: "flex",
        flexDirection: "row",
       justifyContent: "center",
       marginTop: 10,
    },
    
});

