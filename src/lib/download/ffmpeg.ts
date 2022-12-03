import ffmpeg from 'fluent-ffmpeg';
const ffmpegPath = require('ffmpeg-static').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

export default ffmpeg;
