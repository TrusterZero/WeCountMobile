import React, {Component} from 'react'
import {Text, StyleSheet, View} from 'react-native'
import * as Socket from "../../socket/socket";
import {Event} from "../../socket/socket";

class Countdown extends Component {


    constructor() {
        super();
        Socket.listen(Event.sumUsed, (cooldownActivationData) => this.startCountdown(cooldownActivationData));
    }

    componentWillMount() {
        this.setState({countdown: this.props.cooldown});
    }

    startCountdown(cooldownActivationData) {
        if (cooldownActivationData.spellId !== this.props.spellId) {
            return;
        }
        if(this.state.countdown != this.props.cooldown){
            return;
        }
        this.counter = setInterval(() => {
            this.decrementCountdown();
        }, 1000)
    }

    decrementCountdown() {
        if (this.state.countdown <= 0) {
            this.resetCountdown();
            return;
        }
        this.setState({countdown: this.state.countdown - 1});
    }

    resetCountdown() {
        clearInterval(this.counter);
        this.setState({countdown: this.props.cooldown});
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.countdown != this.props.cooldown ?
                    <Text style={styles.text}>{this.state.countdown}</Text> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        left: '50%',
        top:'50%',
        position:'absolute',
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize:40,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
})
export default Countdown