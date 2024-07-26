require('dotenv').config();
const OBSWebSocket = require('obs-websocket-js').default;
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
