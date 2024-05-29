import chokidar from 'chokidar';
import { exec } from 'child_process';

const pathToWatch = '/usr/src/app';

// Chokidar options
const watcher = chokidar.watch(pathToWatch, {
  ignored: /node_modules|\.git/, // Add here file to ignore on the watcher
  persistent: true,
  usePolling: true,
  interval: 1000
});

// actions called when a file is added, changed or deleted
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
