import React, {Component} from 'react'
import {
    Text, TextInput, Button, StyleSheet, Picker, Image, KeyboardAvoidingView, View, TouchableOpacity
} from 'react-native'
import * as dataManager from "../../dataManager/dataManager";
import * as Socket from '../../socket/socket';

class Login extends Component {
    state = {
        summonerName: '',
        region: 'EUW'
    };

    constructor(){
        super();
    }

    login = () => {

        const {summonerName, region} = this.state;
        this.renewSummonerInfo();
        if (summonerName === '' || region === '') {
            alert('Please fill in summonername');
            return;
        }
        Socket.setUserName(summonerName);
        this.props.updateSummonerInfo({
            summonerName,
            region,
            loggedIn: true
        })
    };

    renewSummonerInfo() {
        dataManager.store('summonerName', this.state.summonerName);
        dataManager.store('region', this.state.region);
    }

    componentDidMount() {
        console.log(Object.values(this.props));
    }

    render() {
        const {summonerName, region} = this.state;
        const {containerS, textS, formS, textInputS, iconS, pickerS, buttonS, buttonTextS} = styles;

        return (
            <KeyboardAvoidingView style={containerS} behavior={"padding"}>
                <Image source={require('../../../assets/logo-normal-no-background-small.png')}
                       style={iconS}/>
                <Text style={textS}>Summoner</Text>
                <View style={formS}>
                    <TextInput style={textInputS}
                               placeholder={'summonername'}
                               placeholderTextColor = {'#444'}
                               underlineColorAndroid={'transparent'}
                               value={summonerName}
                               onChangeText={(text) => this.setState({summonerName: text})}/>
                    <Picker style={pickerS}
                            selectedValue={region.toString()}
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
                </View>
                <TouchableOpacity onPress={this.login} style={buttonS}>
                    <Text style={buttonTextS}>
                        Log In
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    containerS: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textS: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 15
    },
    formS: {
        overflow: 'hidden',
        width: 250,
        height: 40,
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 0.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight:0,
    },
    textInputS: {
        textAlign: 'center',
        width: 150,
        borderRightWidth: 0,
        backgroundColor: 'black',
        color: 'white',

    },
    iconS: {
        resizeMode: 'contain',
        width: 400,
        height: 300,
    },
    pickerS: {
        width: 100,
        padding:0,
        margin:0,
        backgroundColor: 'black',
        color: 'white',
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius:0,
    },
    buttonS: {
        borderRadius: 20,
        width: 120,
        marginTop: 40,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#551A8B',
    },
    buttonTextS: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
});


export default Login