import React from "react"
import {StyleSheet, Text, View} from "react-native";

export default class MoreScreen extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>MoreScreen</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    }
});