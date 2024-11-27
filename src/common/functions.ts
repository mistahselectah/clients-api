import 'dotenv/config';
import * as crypto from 'crypto';

export function md5(value: string): string {
  return crypto
    .createHash('md5')
    .update(value + process.env.SALT)
    .digest('hex');
}
