import React from 'react';
import {StyleSheet, ImageBackground, BackHandler, Alert} from 'react-native';
import Login from "./src/components/login";
import MatchScreen from "./src/components/matchScreen/matchScreen"
import * as dataManager from "./src/dataManager/dataManager";
import * as Socket from './src/socket/socket'
import {Event} from "./src/socket/socket";

export default class App extends React.Component {

    state = {
        summonerName: null,
        region: null,
        loggedIn: false,
    };


    constructor() {
        super();
    }

    componentDidMount() {
        Socket.listen(Socket.Event.requestError, (error) => this.handleError(error))
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        this.fetchSummonerInfo()
    }


    updateSummonerInfo(summonerInfo) {
        const {summonerName, region, loggedIn} = summonerInfo;
        this.setState({summonerName, region, loggedIn})
        console.log(this.state)
    }

    fetchSummonerInfo() {
        dataManager.get('summonerName').then((value) => {
            if (value !== '') {
                this.setState({summonerName: value});
                this.autoLogin();
            }

        });
        dataManager.get('region').then((value) => {
            if (value !== '') {
                this.setState({region: value});
                this.autoLogin();
            }
        })
    }

    autoLogin() {
        const {summonerName, region} = this.state;
        if (summonerName && region) {
            Socket.setUserName(summonerName);
            this.setState({
                summonerName,
                region,
                loggedIn: true
            })
        }

    }

    logOut() {
        dataManager.store('summonerName', '')
        dataManager.store('region', '');
        this.setState({
            summonerName: null,
            region: null,
            loggedIn: false
        })
    }

    handleBack() {
        Alert.alert(
            'We Count',
            'Are you sure you want to leave We Count?',
            [{text: 'OK', onPress: () => BackHandler.exitApp()},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            {cancelable: true}
        )
        return true;
    }

    handleError(error) {
        if (error.message === 'websocket error') {
            return;
        }
        console.log(error)
        if (error.status === Socket.ErrorCode.summonerNotFound) {
            this.logOut();
        }
        alert(error.message)
    }

    render() {
        const containerS = styles.containerS;
        const summonerInfo = this.state;
        return (
            <ImageBackground source={require('./assets/background-image.jpg')} style={containerS}>
                {this.state.loggedIn ? <MatchScreen logOut={this.logOut.bind(this)} summonerInfo={summonerInfo}/> :
                    <Login updateSummonerInfo={this.updateSummonerInfo.bind(this)}/>}
            </ImageBackground>
        );
    }


}


const styles = StyleSheet.create({
    containerS: {
        zIndex: 100,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
