var fs = require('fs');
var ytdl = require('ytdl-core');
var args = process.argv.slice(2);
var path = require('path');
var exec = require('youtube-dl-exec').exec;
if (args.length === 0) {
    console.log("Aucun argument fourni");
}
else {
    console.log("Les arguments fournis sont :");
    args.forEach(function (arg, index) {
        console.log("Argument ".concat(index + 1, ": ").concat(arg));
    });
}
var videoUrl = 'https://www.youtube.com/watch?v=B3Th1tEmB-U'; // Définir un nom de fichier de sortie
var outputFileName = 'video.mp4';
var outputPath = path.resolve(__dirname, outputFileName);
// Options pour le flux de vidéo
var options = {
    quality: 'highestvideo',
    requestOptions: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
        }
    }
};
// Début du processus de téléchargement
console.log('Début du téléchargement...');
// // Création du flux de téléchargement
// const videoStream = ytdl(videoUrl, options)
//     .on('info', (info) => {
//         console.log(`Titre de la vidéo : ${info.videoDetails.title}`);
//         console.log('Téléchargement en cours...');
//     })
//     .on('progress', (chunkLength, downloaded, total) => {
//         const percent = ((downloaded / total) * 100).toFixed(2);
//         console.log(`Téléchargé : ${percent}%`);
//     })
//     .on('response', (response) => {
//         console.log('Réponse reçue du serveur :', response.statusCode);
//         if (response.statusCode === 403) {
//             console.error('Erreur 403 : Accès refusé. Vérifiez si la vidéo est accessible ou si des restrictions sont en place.');
//         }
//     })
//     .on('error', (err) => {
//         console.error('Erreur lors du téléchargement :', err);
//     })
//     .on('end', () => {
//         console.log('Téléchargement terminé !');
//     });
// // Création du flux de fichier
// const fileStream = fs.createWriteStream(outputPath);
// // Gestion des erreurs d'écriture de fichier
// fileStream.on('error', (err) => {
//     console.error('Erreur lors de l\'écriture du fichier :', err);
// });
// // Connecter le flux vidéo au flux de fichier
// videoStream.pipe(fileStream).on('finish', () => {
//     console.log('Le fichier a été enregistré avec succès.');
// });
// Utiliser yt-dlp pour télécharger la vidéo
exec(videoUrl, {
    output: outputPath,
    format: 'bestvideo+bestaudio',
    mergeOutputFormat: 'mp4'
}).then(function (output) {
    console.log('Téléchargement terminé !');
    console.log(output);
}).catch(function (err) {
    console.error('Erreur lors du téléchargement :', err);
});
