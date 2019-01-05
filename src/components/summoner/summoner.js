import React, {Component} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import Spell from '../spell/spell'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

class Summoner extends Component {
    champImageUrl = 'http://ddragon.leagueoflegends.com/cdn/8.21.1/img/champion/'

    render() {
        const {spell1, spell2, champion} = this.props.summoner;
        const {containerS, portraitS} = styles;

        return (
            <View style={containerS}>
                <Image
                    style={portraitS}
                    source={{uri: `${this.champImageUrl}${champion.image}`}}
                />
                <Spell spell={spell1}/>
                <Spell spell={spell2}/>
            </View>)
    }
}

const styles = StyleSheet.create({
    containerS: {
        display:"flex",
        marginTop: hp('0.50%'),
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    portraitS: {
        width: wp('23.5%'),
        height: wp('23.5%'),
        borderColor: 'gold',
        marginTop: 15,
        borderRadius: 100,
        borderWidth: 2
    }
});

export default Summoner