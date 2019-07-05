import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';


export default class EndMatchButton extends React.Component {

    render() {
        return (
            <View style={styles.buttonHolder}>
                <TouchableOpacity onPress={() => this.props.endMatch()} style={styles.button}>
                    <Text style={styles.buttonText}>End Match</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    button: {
        paddingTop: hp('2.5%'),
        paddingBottom: hp('2.5%'),
        width: '100%',
        flex: 1,
        backgroundColor: 'red',
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    buttonHolder: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: '-50%',
        right: '-50%',
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
});