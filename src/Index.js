import React from 'react';
import {isLoggedIn} from "./Auth";
import {createRootNavigator} from "./Router";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {createAppContainer} from "react-navigation";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            checkedLogin: false
        };
    }

    componentDidMount() {
        isLoggedIn()
            .then(res => this.setState({ loggedIn: res, checkedLogin: true }))
            .catch(_ => alert("An error occurred"));
    }

    render() {
        const { checkedLogin, loggedIn } = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedLogin) {
            return (
                <View style={[styles.container, styles.vertical]} >
                    <ActivityIndicator size="large" color="#b3cdfb" />
                </View>
            )
        }

        const Layout = createAppContainer(createRootNavigator(loggedIn));
        return <Layout />;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    vertical: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10
    }
});