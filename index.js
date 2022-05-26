const OBSWebSocket = require('obs-websocket-js');

const obs = new OBSWebSocket();
obs.connect('ws://192.168.2.189:4444', 'u8g$A{A9').then(() => { }).catch(err => console.log(err));