
const fs = require('fs');
const ytdl = require('ytdl-core');
const path = require('path');
const { exec } = require('youtube-dl-exec');

import axios from 'axios';


const args: string[] = process.argv.slice(2); // On récupère les arguments à partir du 3e élément

let argumentsArray: string[] = [];

if (args.length === 0) {
    console.log("Aucun argument fourni");
} else {
    argumentsArray = args.map(arg => String(arg));
}

argumentsArray.forEach((arg, index) => {
    processYouTubeVideo(arg);
});

async function processYouTubeVideo(arg: string): Promise<void> {

    let outputFileName = await getYouTubeVideoTitle(arg) + '.mp4';
    outputFileName = sanitizeFileName(outputFileName);
    const outputPath = path.resolve(__dirname, 'output', outputFileName);

    exec(arg, {
        output: outputPath,
        format: 'bestvideo+bestaudio',
        mergeOutputFormat: 'mp4'
    }).then((output) => {
        // console.log(output);
        console.log('Created file:', outputPath);
    }).catch((err) => {
        console.error('Erreur lors du téléchargement :', err);
    });
}

async function getYouTubeVideoTitle(url: string): Promise<string | null> {
    try {
        const response = await axios.get(url);
        const html = response.data;

        // Regex to extract the title from the YouTube page
        const match = html.match(/<title>(.*?)<\/title>/);
        if (match && match[1]) {
            // YouTube titles include " - YouTube", so we strip that part
            return match[1].replace(' - YouTube', '').trim();
        } else {
            return null; // Title not found
        }
    } catch (error) {
        console.error('Error fetching YouTube video title:', error);
        return null;
    }
}

function sanitizeFileName(fileName: string): string {
    return fileName.replace(/[\/\\]/g, '_');
}
