import React, {Component} from 'react';
import {View, Image, Text, TouchableHighlight} from 'react-native'
import { Event } from '../../socket/socket'
import * as Socket from '../../socket/socket'

class Spell extends Component {
    spellImageUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/'

    constructor() {
        super();

        Socket.listen(Event.sumUsed, (cooldownActivationData) => this.startCooldown(cooldownActivationData));
    }

    startCooldown(cooldownActivationData) {
        console.log('hoi')
        if(cooldownActivationData.spellId !== this.spell.id ) {
            return;
        }
        this.counter = setInterval(() => {
            this.decrementCountdown();
        },1000)
    }

    componentWillMount(){
        this.spell = this.props.spell;
        this.setState({countdown: this.spell.cooldown})
    }

    decrementCountdown() {

        if(this.state.countdown <= 0){
            this.resetCountdown();
            return;
        }
        this.setState({ countdown: this.state.countdown-1});
    }

    resetCountdown() {
        clearInterval(this.counter);
        this.setState({ countdown: this.spell.cooldown });
    }

    sumUsed() {
        Socket.send(Event.startCooldown,{spellId: this.spell.id, timeStamp: Date.now()})
    }

    render() {

        return (
            <View>
                <TouchableHighlight onPress={() => this.sumUsed()}>
                <Image
                    style={{width: 150, height: 150}}
                    source={{uri: `${this.spellImageUrl}${this.spell.image}`}}
                />
                </TouchableHighlight>
                <Text>{this.state.countdown}</Text>
            </View>)
    }

}

export default Spell