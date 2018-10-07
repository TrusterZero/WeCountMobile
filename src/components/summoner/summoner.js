import React, {Component} from 'react'
import {View, Image, StyleSheet} from 'react-native'
import Spell from '../spell/spell'


class Summoner extends Component {
    champImageUrl = 'http://ddragon.leagueoflegends.com/cdn/8.19.1/img/champion/'

    state = { }


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