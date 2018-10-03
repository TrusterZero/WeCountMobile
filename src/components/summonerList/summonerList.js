import React, {Component} from 'react'
import {Button, View, StyleSheet} from 'react-native'
import Summoner from "../summoner/summoner";
import {KeepAwake} from 'expo';

class SummonerList extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View>

                {this.props.summoners.map((summoner) => <Summoner key={summoner.id} summoner={summoner}/>)}

                <KeepAwake/>
            </View>)
    }
}

export default SummonerList