import "dotenv/config"
import "./webserver.js"
import { schedule } from "node-cron";
import downloadModule from "./downloadModule.js"

schedule("0 5 * * TUE", downloadModule);