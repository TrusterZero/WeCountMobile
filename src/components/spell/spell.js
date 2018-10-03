import React, {Component} from 'react';
import {View, Image, Text, TouchableHighlight, StyleSheet} from 'react-native'
import {Event} from '../../socket/socket'
import * as Socket from '../../socket/socket'
import Countdown from '../countdown/countdown'


class Spell extends Component {
    spellImageUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/'

    constructor() {
        super();
    }

    sumTell() {
        Socket.send(Event.startCooldown, {spellId: this.props.spell.id, timeStamp: Date.now()})
    }

    render() {

        return (
            <TouchableHighlight style={{borderRadius:100}} onPress={() => this.sumTell()}>
                <View style={styles.container}>

                    <Image
                        style={styles.image}
                        source={{uri: `${this.spellImageUrl}${this.props.spell.image}`}}
                    />

                    <Countdown spellId={this.props.spell.id} cooldown={this.props.spell.cooldown}/>
                </View>
            </TouchableHighlight>)
    }

}

const styles = StyleSheet.create({
    container: {},
    image: {
        margin: 5,
        width: 150,
        height: 150,
        borderRadius:100,
    }
});

export default Spell