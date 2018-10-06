import React from 'react';
import {StyleSheet, ImageBackground, BackHandler, Alert} from 'react-native';
import Login from "./src/components/login";
import MatchScreen from "./src/components/matchScreen/matchScreen"
import * as dataManager from "./src/dataManager/dataManager";


export default class App extends React.Component {

    state = {
        summonerName: null,
        region: null,
        loggedIn: false,
    };


    constructor() {
        super();
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        this.fetchSummonerInfo()
    }

    updateSummonerInfo(summonerInfo) {
        console.log(summonerInfo)
        this.setState({
            summonerName: summonerInfo.summonerName,
            region: summonerInfo.region,
            loggedIn: summonerInfo.loggedIn
        })
    }

    fetchSummonerInfo() {
        dataManager.get('summonerName').then((value) => {
            this.setState({summonerName: value});
            this.autoLogin();
        });
        dataManager.get('region').then((value) => {
            this.setState({region: value})
            this.autoLogin();
        });
    }
                            
    autoLogin() {
        if (this.state.summonerName !== null && this.state.region !== null) {
            this.setState({
                loggedIn: true
            })
        }
    }

    logOut() {
        dataManager.store('summonerName',null).then(()=>{
            dataManager.get('summonerName').then((value) => {
                console.log(value);
            })
        });
        dataManager.store('region', null);
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

    render() {
        return (
            <ImageBackground source={require('./assets/background-image.jpg')} style={styles.container}>

                {this.state.loggedIn ? <MatchScreen logOut={this.logOut.bind(this)} summonerInfo={this.state}/> :
                    <Login updateSummonerInfo={this.updateSummonerInfo.bind(this)}/>}

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        zIndex: 100,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
