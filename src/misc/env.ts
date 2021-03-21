import * as fs from 'fs';
import * as dotenv from 'dotenv';

const cwd = process.cwd();
const cache = dotenv.parse(fs.readFileSync(`${cwd}/.env`));

export const get = (key: string): string => cache[key];
