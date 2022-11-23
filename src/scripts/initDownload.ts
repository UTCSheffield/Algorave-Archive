import { fetch } from '@sapphire/fetch';
import type { YTVideoList } from './../types/youtubeApi.js';
import processDownload from './../lib/download/processDownload.js';
import 'dotenv/config';
// get list of a video sorted by date
function getVideoList() {
	return fetch<YTVideoList>(
		`https://www.googleapis.com/youtube/v3/search?key=${String(process.env.YOUTUBE_API_KEY)}&channelId=${String(
			process.env.YOUTUBE_CHANNEL_ID
		)}&part=snippet,id&order=date&maxResults=20`
	);
}
getVideoList().then((res) => {
	res.items.forEach((item) => {
		if (!item) return;
		console.log(`Fetched Video ${item.id.videoId}`);
		processDownload(item.id.videoId);
	});
});
