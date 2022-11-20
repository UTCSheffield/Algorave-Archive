import fs from "fs";

export default function readOutputDir() {
    const arr = [];
    const files = fs.readdirSync(`${process.cwd()}/output`).filter(file => file.endsWith(".mp3"));
    for (const file of files) {
        arr.push(file);
    }
    return arr;
}