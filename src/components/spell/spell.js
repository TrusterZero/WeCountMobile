import React, {Component} from 'react';
import {View, Image, Text, TouchableHighlight, StyleSheet} from 'react-native'
import {Event} from '../../socket/socket'
import * as Socket from '../../socket/socket'
import Countdown from '../countdown/countdown'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const spellSizeinPercentage = '23%';
class Spell extends Component {
    spellImageUrl = 'https://ddragon.leagueoflegends.com/cdn/9.2.1/img/spell/'

    state = {
        onCooldown: false,
    };

    constructor() {
        super();
    }

    sumTell() {
        Socket.send(Event.startCooldown, {spellId: this.props.spell.id, timeStamp: Date.now()})
    }

    toggleCooldown(onCooldown){
        this.setState({onCooldown})
    }


    render() {
        const onCooldown = this.state.onCooldown;
        const spell = this.props.spell;
        const {containerS, imageS, onCooldownS, holderS} = styles

        return (
            <TouchableHighlight style={containerS} onPress={() => this.sumTell()}>
                <View style={holderS} >

                    <Image
                        style={ onCooldown? [imageS, onCooldownS] : imageS}
                        source={{uri: `${this.spellImageUrl}${spell.image}`}}
                    />

                    <Countdown toggleCooldown={this.toggleCooldown.bind(this)} spellId={spell.id} cooldown={spell.cooldown}/>
                </View>
            </TouchableHighlight>)
    }

    componentWillUnmount(){
        Socket.stop(Event.sumUsed);
    }
}

const styles = StyleSheet.create({
    containerS: {
        width: wp(spellSizeinPercentage),
        height: wp(spellSizeinPercentage),
        borderRadius:100,
    },
    imageS: {
        borderColor: 'white',
        borderWidth: 2,
        width: wp(spellSizeinPercentage),
        height: wp(spellSizeinPercentage),
        borderRadius: 100
    },
    onCooldownS: {
        opacity:0.5
    },
    holderS: {
        borderRadius: 100,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Spell