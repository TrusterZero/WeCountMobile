import React, {Component} from 'react'
import {Text, StyleSheet, View, Vibration, AppState} from 'react-native'
import * as Socket from "../../socket/socket";
import {Event} from "../../socket/socket";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

class Countdown extends Component {

    state = {
        counting: false
    }

    constructor() {
        super();
        Socket.listen(Event.sumUsed, (cooldownActivationData) =>
            this.startCountdown(cooldownActivationData, true));
        Socket.listen(Event.spellHistory, (spellHistory) => this.checkHistory(spellHistory))
    }



    componentWillUnmount(){
        clearInterval(this.counter);
        Socket.stop(Event.sumUsed);
        Socket.stop(Event.spellHistory);
    }

    checkHistory(spellHistory) {
        spellHistory.forEach((cooldownActivationData) => this.startCountdown(cooldownActivationData, false))
    }

    startCountdown(cooldownActivationData, vibrate) {

        const {spellId, cooldown} = this.props;
        //difference between now and moment that cooldown was started in seconds
        const countdown = Math.ceil(cooldown - (Date.now() - cooldownActivationData.timeStamp) / 1000);

        if (cooldownActivationData.spellId !== spellId) {
            return;
        }

        if(this.state.counting || countdown <= 0){
            return;
        }

        this.setState({counting: true});
        this.setState({countdown: countdown - 1}); // instantly start cooldown for UX

        if(vibrate){
            Vibration.vibrate(250);
        }

        this.props.toggleCooldown(true);
        this.counter = setInterval(() => {
            this.decrementCountdown();
        }, 1000)
    }

    decrementCountdown() {
        const countdown = this.state.countdown;

        if (countdown <= 0) {
            this.resetCountdown();
            return;
        }
        this.setState({countdown: countdown - 1});
    }

    resetCountdown() {
        clearInterval(this.counter);
        this.props.toggleCooldown(false);
        this.setState({counting: false});
        this.setState({countdown: this.props.cooldown});
    }

    render() {
        const {containerS, textS} = styles
        const countdown = this.state.countdown;

        return (
            <View style={containerS}>
                {countdown !== this.props.cooldown ?
                    <Text style={textS}>{countdown}</Text> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerS: {
        position:'absolute',
    },
    textS: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: hp('5%'),
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
})
export default Countdown