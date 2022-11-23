import 'dotenv/config';
import './webserverModule.js';
import { schedule } from 'node-cron';
import downloadModule from './downloadModule.js';

// Set defaults for configuration
if (typeof process.env.WEBSERVER_ENABLED == 'undefined') {
    process.env.WEBSERVER_ENABLED = true;
}
schedule('0 5 * * TUE', downloadModule);
