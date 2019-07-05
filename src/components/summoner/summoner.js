import React, {Component} from 'react'
import {View, Image, StyleSheet} from 'react-native'
import Spell from '../spell/spell'
import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const portraitSizeinPercentage = '22%';

class Summoner extends Component {
    champImageUrl = 'http://ddragon.leagueoflegends.com/cdn/9.2.1/img/champion/'

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
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    portraitS: {
        width: wp(portraitSizeinPercentage),
        height: wp(portraitSizeinPercentage),
        borderColor: 'gold',
        marginTop: wp('2%'),
        borderRadius: 100,
        borderWidth: 2
    }
});

export default Summoner