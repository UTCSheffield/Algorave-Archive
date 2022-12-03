import fs from 'node:fs';
export function findMediaFile(id: string) {
	const files = fs.readdirSync(`${process.cwd()}/output`).filter((file) => file.endsWith('.mp3'));
	const file = files.find((file) => file.includes(id));
	if (!file) return null;
	return file;
}
