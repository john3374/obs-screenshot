const OBSWebSocket = require('obs-websocket-js');

const obs = new OBSWebSocket();
obs.connect({ address: '192.168.2.189:4444', password: 'u8g$A{A9' }).then(() => {
  obs.send('TriggerHotkeyByName', { hotkeyName: 'OBSBasic.SelectedSourceScreenshot' })
    .then(() => console.log('hi'))
    .catch(err => console.log(err))
    .finally(() => obs.disconnect());
}).catch(err => console.log(err));