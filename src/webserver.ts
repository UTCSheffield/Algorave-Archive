import express from "express";
import readOutputDir from "./lib/webserver/readOutputDir.js";
import cors from "cors";

const app = express();
app.use(cors())

app.get('/', (_req, res) => {
    res.sendFile('index.html', { root: `${process.cwd()}/pages/` });
})

app.get('/tracks/', (_req, res) => {
    res.json({
        tracks: readOutputDir()
    });
})

app.get('/tracks/:id', (req, res) => {
    const { id } = req.params;
    res.sendFile(`${id}.mp3`, { root: `${process.cwd()}/output/` });
})

app.listen(process.env.WEBSERVER_PORT, () => {
    console.log(`Webserver listening on port ${process.env.WEBSERVER_PORT}`);
})

