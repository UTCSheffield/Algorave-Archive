import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import ffmpeg from './ffmpeg.js';
import metadataDB from './metadataDB.js';
export default function processDownload(vidID: string) {
	try {
		if (!existsSync(`${process.cwd()}/output/Audio-${vidID}.m4a`)) {
			console.log('Downloading Video');
			const ytdl = spawn('youtube-dl', [`-o`, `${process.cwd()}/output/Audio-%(id)s.%(ext)s`, `https://www.youtube.com/watch?v=${vidID}`, '-f', '140']);
			ytdl.stdout.on('data', (data) => {
				console.log(`[YTDL] [${vidID}] stdout: ${data}`);
			});
			ytdl.stderr.on('data', (data) => {
				console.error(`[YTDL] [${vidID}] stderr: ${data}`);
			});
			ytdl.on('close', (code) => {
				console.log(`[YTDL] [${vidID}] child process exited with code ${code}`);
				if (code === 0) {
					stripVideo(vidID);
				} else {
					return;
				}
			});
		} else {
			console.log('the Video is already downloaded');
 			stripVideo(vidID);
		}
	} catch (err) {
		console.error(err);
	}
}
function stripVideo(vidID: string) {
	try {
		if (!existsSync(`${process.cwd()}/output/Audio-${vidID}.mp3`)) {
			console.log('Stripping Video');
			ffmpeg().input(`${process.cwd()}/output/Audio-${vidID}.m4a`).save(`${process.cwd()}/output/Audio-${vidID}.mp3`);
			new metadataDB().grabMetadata(vidID);
		} else {
			console.log('the Video is already stripped');
			new metadataDB().grabMetadata(vidID);
		}
	} catch (err) {
		console.log("stripping didn't work...")
		return
	}
}
