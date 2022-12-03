import 'dotenv/config';
import './webserverModule.js';
import './discordModule.js';
import { schedule } from 'node-cron';
import downloadModule from './downloadModule.js';

schedule('0 17 * * TUE', downloadModule);
