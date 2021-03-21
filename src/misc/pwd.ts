import * as crypto from 'crypto';

const s4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export const hash = (password: string): string => {
  return crypto
    .createHash('md5')
    .update(password, 'utf8')
    .digest('hex');
};

export const random = () => s4() + s4();
