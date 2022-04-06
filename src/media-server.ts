import NodeMediaServer from 'node-media-server';
import { rtmp_config } from './config/default';
import axios from 'axios';
import { keyCheckAddr, onAirAddr, offAirAddr } from './config/api-adress';

export const nms = new NodeMediaServer(rtmp_config);

nms.on('prePublish', async (id, StreamPath, args) => {
  let token: string[] = StreamPath.split('/');
  const stream_key: string = token[token.length - 1];
  const data = {
    uuid: stream_key,
  };

  axios
    .post(keyCheckAddr, data)
    .then((res) => {
      if (!res.data.isExist) {
        throw res.data.message;
      }
    })
    .catch((err) => {
      let session: any = nms.getSession(id);
      session.reject();
      console.log(err);
      return;
    });
});

nms.on('postPublish', (id, StreamPath, args) => {
  let token = StreamPath.split('/');
  const stream_key = token[token.length - 1];
  const data = {
    uuid: stream_key,
  };

  axios
    .post(onAirAddr, data)
    .then((res) => {
      if (!res.data.success) {
        throw res.data.message;
      }
    })
    .catch((err) => {
      let session: any = nms.getSession(id);
      session.reject();
      console.log('[OnAir Error]', err);
      return;
    });
});

nms.on('donePublish', (id, StreamPath, args) => {
  let token = StreamPath.split('/');
  const stream_key = token[token.length - 1];
  const data = {
    uuid: stream_key,
  };

  axios
    .post(offAirAddr, data)
    .then((res) => {
      if (!res.data.success) {
        throw res.data.message;
      }
    })
    .catch((err) => {
      console.log('[OffAir Error]', err);
      return;
    });
});
