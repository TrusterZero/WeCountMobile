import {Image, Text, TouchableHighlight, View, StyleSheet} from "react-native";
import React from "react";

export default class StartMatchImageButton extends React.Component{


    render() {
        return (
            <View style={styles.summonerList}>
                <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.8}
                                    style={{borderRadius: 300}} onPress={() => this.props.getMatch()}>
                    <Image style={styles.icon} source={require('../../../assets/icon.png')}/>
                </TouchableHighlight>
                <Text style={styles.text}>Tap the clock to find your match!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    summonerList: {
        zIndex: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        resizeMode: 'contain',
        width: 400,
        height: 300,
    },
    text: {
        paddingTop: 50,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});