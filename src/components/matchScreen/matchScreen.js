import React from 'react';
import {View, StyleSheet, AppState, Vibration} from 'react-native'
import {Header} from 'react-native-elements'
import {Event} from '../../socket/socket'
import SummonerList from '../summonerList/summonerList'
import * as Socket from '../../socket/socket';
import EndMatchButton from "../endMatchButton/endMatchButton";
import StartMatchImageButton from "../startMatchButton/startMatchButton";
import LoadingScreen from '../loadingScreen/loadingScreen'
import ActiveSummoners from '../activeSummoners/activeSummoners'
import {AdMobInterstitial} from 'react-native-admob'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {AdMobSettings} from "../../adMob/adMob";
import * as dataManager from "../../dataManager/dataManager";


AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
//AdMobInterstitial.setAdUnitID(AdMobSettings.adId)

export default class MatchScreen extends React.Component {

    state = {
        match: null,
        loading: false,
        user: null,
        enemyTeam: [],
        allyTeam: []
    };
    lastMatchId = 0;
    incomingMatch = null;
    adShown = false;

    constructor() {
        super();
    }

    componentWillUnmount() {
        Socket.socket.removeListener(Event.matchCreated, this.handleMatchCreatedSocketEvent)
    }

    componentDidMount(){
        console.log(this.props.summonerInfo);
        this.setState({
            summonerName: this.props.summonerInfo.summonerName,
            region: this.props.summonerInfo.region
        });
        AdMobInterstitial.setTestDeviceID('EMULATOR');
        AdMobInterstitial.addEventListener('interstitialDidClose', () => this.setTeams(this.incomingMatch));
        AdMobInterstitial.addEventListener('interstitialDidFailToLoad', () => this.setTeams(this.incomingMatch));
        Socket.socket.once(Event.matchCreated, (match) => this.handleMatchCreatedSocketEvent(match));
        Socket.listen(Event.requestError, () => this.setState({loading: false}));
    }

    getMatch() {
        const {summonerName, region} = this.state;
        this.setState({loading: true});
        Socket.send(Event.createMatch, {summonerName,region});
    }

    endMatch() {
        this.setState({match: null, user: null})
    }

    setTeams(match) {
        if (!match) {
            return;
        }

        const {summonerName} = this.state;
        const summoners = match.summoners;

        // Get the info on the logged in user
        const user = summoners.find((summoner) => summoner.name.toLowerCase() === summonerName.toLowerCase());
        const enemyTeam = [];

        if (!user) {
        // Nasty-fix: Deze component laad dubbel hierdoor krijg ik problemen op het luisteren naar events
            return;
        }

        summoners.forEach((summoner) => {
            if (summoner.teamId !== user.teamId) {
                enemyTeam.push(summoner);
            }
        });
        this.setState({user, match, enemyTeam, loading: false})

    }

    logOut() {
        this.setState({user: null});
        this.props.logOut();
    }

    render() {
        const {match, user, loading, enemyTeam} = this.state;
        const {containerS, headerHolderS} = styles;

        return (
            <View style={containerS}>
                <View style={headerHolderS}>
                    <Header
                        backgroundColor={'#551A8B'}
                        outerContainerStyles={{width: '100%'}}
                        centerComponent={{text: 'We Count', style: {color: '#fff'}}}
                        rightComponent={{icon: 'exit-to-app', color: '#fff', onPress: () => this.logOut(),}}
                    />
                </View>
                {loading ? <LoadingScreen text={'Getting Match Data'}/> : null}
                {/*{match ? <ActiveSummoners teamId={user ? user.teamId : 0}/> : null}*/}
                {match ? <SummonerList adShown={this.adShown} endMatch={() => this.endMatch()} summoners={enemyTeam}/> :
                    <StartMatchImageButton getMatch={() => this.getMatch()}/>}
                {match ? <EndMatchButton endMatch={() => this.endMatch()}/> : null}
            </View>
        );
    }

    handleMatchCreatedSocketEvent(match) {
        console.log(match);
        if (this.lastMatchId === match.id) {
            this.adShown = false;
            this.setTeams(match);
            return;
        }
        this.adShown = true;
        this.lastMatchId = match.id;
        this.incomingMatch = match;
        AdMobInterstitial.requestAd(() => {
            AdMobInterstitial.showAd();
        });
    }


}

const styles = StyleSheet.create({
    containerS: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        },
    headerHolderS: {
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        top: -15,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
});
