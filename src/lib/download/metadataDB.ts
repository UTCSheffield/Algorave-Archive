import { fetch } from "@sapphire/fetch";
import type { Imetadata } from "../../types/metadata.js";
import type { YTVideoList } from "../../types/youtubeApi.js";
import { db } from "../db.js";

export default class metadataDB {
    public grabMetadata(vidID: string) {
        try {
            fetch<YTVideoList>(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${vidID}&key=${process.env.YOUTUBE_API_KEY}`)
                .then((res: YTVideoList) => {
                    console.log(`Fetched metadata for Video ${res.items[0].id.videoId}`);
                    (async () => {
                        if (await db.has(`metadata_${vidID}`)) {
                            console.log(`Metadata for Video ${res.items[0].id.videoId} already exists in database`);
                        } else {
                            const metadata: Imetadata = {
                                title: res.items[0].snippet.title,
                                description: res.items[0].snippet.description,
                                publishedAt: res.items[0].snippet.publishedAt,
                                thumbnail: {
                                    url: res.items[0].snippet.thumbnails.high.url,
                                    width: res.items[0].snippet.thumbnails.high.width,
                                    height: res.items[0].snippet.thumbnails.high.height
                                }
                            }
                            if (await db.get(`metadata_${vidID}`) === undefined) {
                                await db.set(`metadata_${vidID}`, metadata);
                                console.log(`Metadata for Video ${res.items[0].id.videoId} has been added to the DB`);
                            } else {
                                await db.set(`metadata_${vidID}`, metadata);
                                console.log(`Metadata for Video ${res.items[0].id.videoId} has been updated in the DB`);
                            }
                        }
                    })();
                    return
            });
        }catch (err) {
            console.log("Can't fetch metadata");
            return
        }
    }
}