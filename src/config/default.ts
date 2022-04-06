import { Config } from 'node-media-server';

export const rtmp_config: Config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 10000,
    gop_cache: false,
    ping: 60,
    ping_timeout: 30,
  },
  http: {
    port: 3000,
    mediaroot: './media',
    allow_origin: '*',
  },
  https: {
    port: 3443,
    key: 'C:/Users/XPEC/Desktop/sparta/TeamQue-MediaServer/key/privkey.pem',
    cert: 'C:/Users/XPEC/Desktop/sparta/TeamQue-MediaServer/key/cert.pem',
  },
  trans: {
    ffmpeg: 'C:/Users/XPEC/Desktop/sparta/ffmpeg/bin/ffmpeg.exe',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=0:hls_list_size=1:hls_flags=delete_segments]',
        mp4: true,
        mp4Flags: '[movflags=frag_keyframe+empty_moov]',
      },
    ],
  },
};
