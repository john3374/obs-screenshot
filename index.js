require('dotenv').config();
const cron = require('node-cron');
const OBSWebSocket = require('obs-websocket-js').default;

const takeScreenshot = () => {
  const obs = new OBSWebSocket();
  obs
    .connect(process.env.OBS_URL || '', process.env.OBS_PASSWORD || '')
    .then(() => {
      obs
        .call('TriggerHotkeyByName', { hotkeyName: 'OBSBasic.SelectedSourceScreenshot' })
        .then(() => {})
        .catch(err => console.error(err))
        .finally(() => obs.disconnect());
    })
    .catch(err => console.error(err));
};
cron.schedule('*/10 * * * *', takeScreenshot, { scheduled: !0 });
