import React from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight, TouchableOpacity, Animated, Button} from 'react-native'
import {Event} from '../../socket/socket'
import SummonerList from '../summonerList/summonerList'
import * as Socket from '../../socket/socket';


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
                {this.state.match ? <SummonerList summoners={this.state.match.summoners}/> :
                    <View style={styles.summonerList}>
                        <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.8}
                                            style={{borderRadius: 300}} onPress={() => this.getMatch()}>
                            <Image style={styles.icon} source={require('../../../assets/icon.png')}/>
                        </TouchableHighlight>
                        <Text style={styles.text}>Tap the clock to find your match!</Text>
                    </View>
                }
                {this.state.match ?
                    <View style={styles.buttonHolder}>
                        <TouchableOpacity onPress={() => this.endMatch()} style={styles.button}>
                            <Text style={styles.buttonText}>End Match</Text>
                        </TouchableOpacity>
                    </View> : null}

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
    summonerList: {
        zIndex: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        resizeMode: 'contain',
        width: 400,
        height: 300,
    },
    text: {
        paddingTop: 50,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    button: {
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%',
        flex: 1,
        backgroundColor: 'red',
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    buttonHolder: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: '-50%',
        right: '-50%',
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }

});
