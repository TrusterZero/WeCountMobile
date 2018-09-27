import React from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import {Event} from './src/socket/socket'
import Login from "./src/components/login";
import Summoner from './src/components/summoner/summoner'
import * as Socket from "./src/socket/socket";

export default class App extends React.Component {
    state = {}


    constructor() {
        super();
        Socket.listen(Socket.Event.requestError, (error) => alert(error.status));
        Socket.listen(Event.matchCreated, (match) => {
            console.log(Socket)
            this.setState({match: match})
        });
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.match ?
                    this.state.match.summoners.map((summoner) => {
                    return <Summoner key={summoner.id} summoner={summoner}/>
                }) : <Login/>}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
