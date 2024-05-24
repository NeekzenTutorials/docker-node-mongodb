const chokidar = require('chokidar');
const { exec } = require('child_process');

// Chemin à surveiller
const pathToWatch = '/usr/src/app';

// Options de Chokidar
const watcher = chokidar.watch(pathToWatch, {
  ignored: /node_modules|\.git/,
  persistent: true,
  usePolling: true,
  interval: 1000
});

// Action à effectuer sur modification de fichier
watcher.on('all', (event, path) => {
  console.log(event, path);
  exec('pm2 reload myapp', (err, stdout, stderr) => {
    if (err) {
      console.error(`Erreur lors du rechargement de l'application: ${err}`);
      return;
    }
    console.log(`Sortie stdout: ${stdout}`);
    console.log(`Sortie stderr: ${stderr}`);
  });
});

console.log(`Surveillance des changements dans ${pathToWatch}`);
