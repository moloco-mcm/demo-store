import type { IncomingMessage } from 'http';
import usParser from 'ua-parser-js';

export const extractDeviceInfoFromRequest = (req: IncomingMessage) => {
  const uaString = req.headers['user-agent'];
  const ua = usParser(uaString);
  // TODO: consider using external module more accurate client IP address (@sjhan-moloco)
  // req.socket is undefined in Netlify function container
  const ip = req.socket?.remoteAddress;

  return {
    os: ua.os.name || '',
    osVersion: ua.os.version,
    model: ua.device.model,
    ip,
  };
};
