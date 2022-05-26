require('dotenv').config();
const cron = require('node-cron');
const { WebClient } = require('@slack/web-api');
const OBSWebSocket = require('obs-websocket-js');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

const errorHandler = (err) => web.chat.postMessage({ channel: 'C03GZMPBD4M', text: err.toString() });
const takeScreenshot = () => {
  const obs = new OBSWebSocket();
  obs.connect({ address: '192.168.2.189:4444', password: process.env.OBS_PASSWORD }).then(() => {
    obs.send('TriggerHotkeyByName', { hotkeyName: 'OBSBasic.SelectedSourceScreenshot' })
      .then(() => { })
      .catch(errorHandler)
      .finally(() => obs.disconnect());
  }).catch(errorHandler);
};
web.conversations.setTopic({ channel: 'C03GZMPBD4M', topic: new Intl.DateTimeFormat('en-CA', { dateStyle: 'short', timeStyle: 'medium' }).format(Date.now()) })
cron.schedule('*/10 * * * *', takeScreenshot, { scheduled: !0 });
