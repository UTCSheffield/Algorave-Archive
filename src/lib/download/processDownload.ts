import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import ffmpeg from './ffmpeg.js';
export default function processDownload(vidID: string) {
	try {
		if (!existsSync(`${process.cwd()}/output/Video-${vidID}.mp4`)) {
			console.log('Downloading Video');
			const ytdl = spawn('youtube-dl', [`-o`, `${process.cwd()}/output/Video-%(id)s.%(ext)s`, `https://www.youtube.com/watch?v=${vidID}`]);
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
			ffmpeg().input(`${process.cwd()}/output/Video-${vidID}.mp4`).save(`${process.cwd()}/output/Audio-${vidID}.mp3`);
		} else {
			console.log('the Video is already stripped');
		}
	} catch (err) {
		console.error(err);
	}
}
