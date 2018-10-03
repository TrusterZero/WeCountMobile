import React, {Component} from 'react'
import {View, Image, StyleSheet} from 'react-native'
import Spell from '../spell/spell'


class Summoner extends Component {
    champImageUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'

    state = {
        id: 91096947,
        champion: {
            id: 17,
            image: 'Teemo.png',
            name: 'teemo'
        },
        hasCDR: false,
        spell1: {
            id: 14,
            cooldown: [210],
            image: 'SummonerDot.png',
            name: 'Ignite'
        },
        spell2: {
            id: 4,
            cooldown: [300],
            image: 'SummonerFlash.png',
            name: 'Flash'
        }

    }


    render() {
        this.summoner = this.props.summoner;
        return (
            <View style={styles.summoner}>
                <Image
                    style={styles.image}
                    source={{uri: `${this.champImageUrl}${this.summoner.champion.image}`}}
                />
                <Spell spell={this.summoner.spell1}/>
                <Spell spell={this.summoner.spell2}/>
            </View>)
    }
}

styles = StyleSheet.create({
    summoner: {
        flexDirection:'row',
    },
    image: {
        marginTop:25,
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 3
    }
})

export default Summoner