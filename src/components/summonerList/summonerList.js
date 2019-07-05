import React, {Component} from 'react'
import { View, StyleSheet, AppState} from 'react-native'
import Summoner from "../summoner/summoner";
import KeepAwake from 'react-native-keep-awake';
import * as Socket from "../../socket/socket";
import {Event} from "../../socket/socket";
import {
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

class SummonerList extends Component {

    state = {
        appState: AppState.currentState,
    };
    adShown = false;
    stateChangeCount = 0;

    constructor() {
        super();
        this.getHistory();
    }

    getHistory() {
        Socket.send(Event.getHistory, null)
    }

    AppStateChange = (nextAppState) => {
        const {appState} = this.state;
        if (nextAppState === 'active' &&
            appState === 'background' ||
            appState === 'inactive') {

            if(!this.adShown) {
                this.props.endMatch();
            }
            this.adShown = false

        }
        this.setState({appState: nextAppState});
    };

    componentDidMount() {
        AppState.addEventListener('change', this.AppStateChange);
        this.adShown = this.props.adShown;
    }

    componentWillUnmount() {
      //  AppState.removeEventListener('change', this.AppStateChange);
    }

    render() {

        return (
            <View style={styles.summonerList}>
                {this.props.summoners ? this.props.summoners.map((summoner) =>
                    <Summoner key={summoner.id} summoner={summoner}/>) : null}
                <KeepAwake/>
            </View>)
    }
}

const styles = StyleSheet.create({
    summonerList: {
        paddingTop: hp('9.5%'),
        alignSelf:'flex-start',
        width: '100%',
        height: hp('60%'),
        display: 'flex',
        flexDirection:'column',
    }
});

export default SummonerList;

