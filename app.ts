
const fs = require('fs');
const ytdl = require('ytdl-core');
const args = process.argv.slice(2);
const path = require('path');
const { exec } = require('youtube-dl-exec');


if (args.length === 0) {
    console.log("Aucun argument fourni");
} else {
    console.log("Les arguments fournis sont :");
    args.forEach((arg, index) => {
        console.log(`Argument ${index + 1}: ${arg}`);
    });
}

const videoUrl = 'https://www.youtube.com/watch?v=B3Th1tEmB-U';// Définir un nom de fichier de sortie
const outputFileName = 'video.mp4';
const outputPath = path.resolve(__dirname, 'output', outputFileName);

// Options pour le flux de vidéo
const options = {
    quality: 'highestvideo',
    requestOptions: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
        }
    }
};

exec(videoUrl, {
    output: outputPath,
    format: 'bestvideo+bestaudio',
    mergeOutputFormat: 'mp4'
}).then((output) => {
    console.log('Téléchargement terminé !');
    console.log(output);
}).catch((err) => {
    console.error('Erreur lors du téléchargement :', err);
});