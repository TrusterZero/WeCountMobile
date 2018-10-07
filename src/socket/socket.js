const io = require('socket.io-client');

export const Event = Object.freeze({
    startCooldown: 'startCooldown',
    createMatch: 'createMatch',
    matchCreated: 'matchCreated',
    sumUsed: 'sumUsed',
    requestError: 'error'
})

export const ErrorCode = Object.freeze({
    notFound: 404,
    matchNotFound: 4041,
    summonerNotFound: 4042,
    forbidden: 403,
    unauthorized: 401,
    unhandled: 0,
    noSummoners: 1
})

export const Source = Object.freeze({
    pc: 0,
    mobile: 1
})

const socket = io('http://192.168.178.150:3000');
let roomId = null;

export function listen(event, callback) {
    socket.on(event, callback)
}

export function send(event, data) {
    const payload = {
        source: Source.mobile,
        roomId: roomId,
        data
    }
    socket.emit(event, payload);
}

export function stop(event) {
    socket.removeListener(event);
}

listen('connect', () => console.log('connected'))
listen('disconnect',()=> {} )

listen(Event.matchCreated, (match) => {
    roomId = match.id
});


