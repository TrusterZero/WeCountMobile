import React, {Component} from 'react'
import {
    Text, TextInput, Button, StyleSheet, Picker, Image, KeyboardAvoidingView
} from 'react-native'
import {LinearGradient} from 'expo';
import * as dataManager from "../../dataManager/dataManager";

class Login extends Component {
    state = {
        summonerName: '',
        region: 'EUW'
    }

    constructor(){
        super();
    }

    login = () => {
        this.renewSummonerInfo();
        if (this.state.summonerName === '' || this.state.region === '') {
            alert('Please fill in summonername');
            return;
        }

        this.props.updateSummonerInfo({
            summonerName: this.state.summonerName,
            region: this.state.region,
            loggedIn: true
        })
    };

    renewSummonerInfo() {
        dataManager.store('summonerName', this.state.summonerName)
        dataManager.store('region', this.state.region)
    }

    componentDidMount() {
        console.log(Object.values(this.props))
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
                <Image source={require('../../../assets/logo-normal-no-background-small.png')}
                       style={styles.icon}/>
                <Text style={styles.text}>Summoner Name</Text>
                <LinearGradient
                    colors={['#bdc3c7', '#2c3e50']}
                    style={{
                        padding: 1,
                        alignItems: 'center',
                        borderRadius: 20,
                        flexDirection: 'row',
                        marginBottom: 100
                    }}>
                    <TextInput style={styles.textInput}
                               underlineColorAndroid={'transparent'}
                               value={this.state.summonerName}
                               onChangeText={(text) => this.setState({summonerName: text})}/>
                    <Picker style={styles.picker}
                            selectedValue={this.state.region.toString()}
                            onValueChange={(itemValue) => this.setState({region: itemValue})}>
                        <Picker.Item label="EUW" value="EUW"/>
                        <Picker.Item label="NA" value="NA"/>
                        <Picker.Item label="EUNE" value="EUNE"/>
                        <Picker.Item label="BR" value="BR"/>
                        <Picker.Item label="LAN" value="LAN"/>
                        <Picker.Item label="LAS" value="LAS"/>
                        <Picker.Item label="OCE" value="OCE"/>
                        <Picker.Item label="RU" value="RU"/>
                        <Picker.Item label="TR" value="TR"/>
                        <Picker.Item label="JP" value="JP"/>
                        <Picker.Item label="SEA" value="SEA"/>
                        <Picker.Item label="KR" value="KR"/>
                        <Picker.Item label="PBE" value="PBE"/>
                        <Picker.Item label="CN" value="CN"/>
                    </Picker>
                </LinearGradient>
                <Button title={'Start Match'} onPress={this.login}/>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 15
    },
    textInput: {
        textAlign: 'center',
        width: 175,
        backgroundColor: 'transparent',
        color: 'white',
        padding: 3,
        borderRadius: 10,

    },
    icon: {
        resizeMode: 'contain',
        width: 400,
        height: 300,
    },
    picker: {
        width: 75,
        backgroundColor: 'transparent',
        color: 'white',
        borderRadius: 10
    },
});


export default Login