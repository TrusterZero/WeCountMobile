import React, { Component } from 'react'
import {Event} from "../../socket/socket";
import {
    View,
    Text, TextInput, Button, StyleSheet,Picker
} from 'react-native'
import * as Socket  from "../../socket/socket";

class Login extends Component {
    state = {
        summonerName: '',
        region: 'EUW'
    }
    startMatch = () => {
        const summonerName = this.state.summonerName;
        if(summonerName === '') {
            alert('Please fill in summonername');
            return;
        }
        Socket.send(Event.createMatch, {summonerName: summonerName, region: this.state.region});
    }

	render() {
		return (
			<View>
                <Text>Summoner Name</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => this.setState({summonerName: text})}/>
                <Text>Region</Text>
                <Picker selectedValue={this.state.region}
                        onValueChange={(itemValue) => this.setState({region: itemValue})}>
                    <Picker.Item label="EUW" value="EUW" />
                    <Picker.Item label="NA" value="NA" />
                    <Picker.Item label="EUNE" value="EUNE" />
                    <Picker.Item label="BR" value="BR" />
                    <Picker.Item label="LAN" value="LAN" />
                    <Picker.Item label="LAS" value="LAS" />
                    <Picker.Item label="OCE" value="OCE" />
                    <Picker.Item label="RU" value="RU" />
                    <Picker.Item label="TR" value="TR" />
                    <Picker.Item label="JP" value="JP" />
                    <Picker.Item label="SEA" value="SEA" />
                    <Picker.Item label="KR" value="KR" />
                    <Picker.Item label="PBE" value="PBE" />
                    <Picker.Item label="CN" value="CN" />
                </Picker>
                <Button title={'Start Match'} onPress={this.startMatch}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    textInput: {
        textAlign: 'center',
        width: 250,
        borderWidth: 1,
        borderColor: 'gray'
    }
})


export default Login