import React from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight, TouchableOpacity} from 'react-native'
import {Header} from 'react-native-elements'
import {Event} from '../../socket/socket'
import SummonerList from '../summonerList/summonerList'
import * as Socket from '../../socket/socket';
import EndMatchButton from "../endMatchButton/endMatchButton";
import StartMatchImageButton from "../startMatchButton/startMatchButton";


export default class MatchScreen extends React.Component {

    state = {};

    constructor() {
        super();
        Socket.listen(Event.matchCreated, (match) => {
            console.log(match);
            this.setState({match: match});
        });
    }

    getMatch() {
        Socket.send(Event.createMatch, {
            summonerName: this.props.summonerInfo.summonerName,
            region: this.props.summonerInfo.region
        });
    }

    endMatch() {
        this.setState({match: null})
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.headerHolder}>
                    <Header
                        backgroundColor={'#551A8B'}
                        outerContainerStyles={{width: '100%'}}
                        centerComponent={{text: 'We Count', style: {color: '#fff'}}}
                        rightComponent={{icon: 'exit-to-app', color: '#fff', onPress: () => this.props.logOut(),}}
                    />
                </View>
                {this.state.match ? <SummonerList summoners={this.state.match.summoners}/> :
                    <StartMatchImageButton getMatch={() => this.getMatch()}/>}
                {this.state.match ? <EndMatchButton endMatch = {() => this.endMatch()}/>: null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },
    header: {
        width: '150%',
    },
    headerHolder: {
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
});
