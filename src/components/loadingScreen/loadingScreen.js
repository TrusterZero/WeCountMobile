import React from "react";
import {StyleSheet, View, Image, Text} from 'react-native'


export default class loadingScreen extends React.Component {

    render() {
        const {containerS, loadingImageS, textS} = styles;

        return(
            <View style={containerS}>
                {/*<Image style={loadingImageS}*/}
                        {/*source={require('../../../assets/loading.gif')}/>*/}
                        <Text style={textS}>{this.props.text}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    containerS: {
        zIndex: 101,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        opacity: 0.5,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    loadingImageS: {
        width: 50,
        height: 50,
    },
    textS: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize:40,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});