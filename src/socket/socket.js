import {timer} from "rxjs";
import * as dataManager from "../dataManager/dataManager";
const io = require('socket.io-client');
//const serverIP = 'http://18.217.193.138:3000';
const serverIP = 'http://192.168.178.101:3000'; // Test server

export const Event = Object.freeze({
    heartBeat: 'heartBeat',
    startCooldown: 'startCooldown',
    createMatch: 'createMatch',
    matchCreated: 'matchCreated',
    reconnectToMatch: 'reconnectToMatch',
    joined: 'joined',
    sumUsed: 'sumUsed',
    requestError: 'requestError',
    getHistory: 'getHistory',
    spellHistory: 'spellHistory',
    activeSummoners: 'activeSummoners',
    getActiveSummoners: 'getActiveSummoners'
})

export const ErrorCode = Object.freeze({
    notFound: 404,
    matchNotFound: 4041,
    summonerNotFound: 4042,
    forbidden: 403,
    unauthorized: 401,
    unhandled: 0,
    noSummoners: 1
});

export const Source = Object.freeze({
    pc: 0,
    mobile: 1
});


export let socket = io(serverIP);
let roomId = null;
let userName;

export function setUserName(summonerName) {
    userName = summonerName;
}

export function connect(){
    socket = io(serverIP);
}
export function reconnect(){
    socket.io.reconnect();
}

export function listen(event, callback) {
    socket.on(event, callback)
}

export function once(event, callback) {
    socket.once(event, callback)
}

export function send(event, data) {

    const payload = {
        source: Source.mobile,
        roomId: roomId,
        userName: userName,
        data
    };

    socket.emit(event, payload);
}

export function stop(event, handler) {
    ;
}

listen(Event.heartBeat,() => {
   timer(5000).subscribe(() => {
       send(Event.heartBeat, null);
   });
});

listen('connect', () => {
    send(Event.heartBeat, null)
});
listen('reconnect', () => {
});
listen('disconnect',()=> {
    reconnect();
} );

listen(Event.matchCreated, (match) => {
    roomId = match.id
});


