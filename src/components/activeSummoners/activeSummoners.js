import React, {Component} from 'react'
import {Image, StyleSheet, View} from 'react-native'
import * as Socket from "../../socket/socket";
import KeepAwake from "react-native-keep-awake";


class ActiveSummoners extends Component {

    champImageUrl = 'http://ddragon.leagueoflegends.com/cdn/8.21.1/img/champion/'
    state = {
        activeTeamMates: []
    }
    constructor() {
        super();
    }

    componentWillUnmount(){
        Socket.stop(Socket.Event.activeSummoners)
    }

    componentWillMount(){
        Socket.listen(Socket.Event.activeSummoners, (data) =>
            this.refreshActiveSummoners(data.summoners));

        Socket.send(Socket.Event.getActiveSummoners, null);
    }

    refreshActiveSummoners(activeSummoners) {

        const  activeTeamMates = activeSummoners.filter((summoner) =>
               summoner.teamId === this.props.teamId);
        if(activeTeamMates !== this.state.activeTeamMates){
            this.setState({activeTeamMates: activeTeamMates})
        }

    }

    render() {
        const {containerS, portraitS} = styles;
        const activeTeamMates = this.state.activeTeamMates;
        console.log(activeTeamMates);
        return (
            <View style={containerS}>
                {activeTeamMates.length > 0 ?
                        <Image
                                key={activeTeamMates[0].id}
                                style={portraitS}
                                source={{uri: `${this.champImageUrl}${activeTeamMates[0].champion.image}`}}
                            />: <KeepAwake/>    }
                }

            </View>)
    }

}

const styles = StyleSheet.create({
    containerS: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '100%',
        height: 50,
        display: "flex",
        position: 'absolute',
        top: 60,
        bottom: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    portraitS: {
        width: 40,
        height: 40,
        borderColor: 'gold',
        marginTop: 5,
        borderRadius: 100,
        borderWidth: 1
    }
});

export default ActiveSummoners;
