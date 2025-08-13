const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const { spawn } = require('child_process');
const waitOn = require('wait-on');

function startDjango() {
  const django = spawn(
    path.join(__dirname, 'scripts', 'start-django.js'),
    { shell: true,
        windowsHide: true, }
  );

  django.stdout?.on('data', (data) => {
    console.log(`Django: ${data}`);
  });

  django.stderr?.on('data', (data) => {
    console.error(`Django error: ${data}`);
  });

  django.on('close', (code) => {
    console.log(`Django exited with code ${code}`);
  });
}

function startNext() {
    spawn('node', [path.join(__dirname, 'scripts/start-next.js')], {
      shell: true,
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
    }).unref();
  }

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadURL('http://localhost:3000'); // Next.js ici
//   win.loadFile('index.html')
}

app.whenReady().then(() => {
    // ipcMain.handle('ping', () => 'pong')
    startDjango();       // ← lancement du backend
    startNext();         // ← lancement du frontend

    // 🕒 Attendre que Next.js soit prêt
    waitOn({ resources: ['http://localhost:3000'], timeout: 30000 }, (err) => {
        if (err) {
        console.error('Next.js ne répond pas :', err);
        } else {
        createWindow();
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
        }
    })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})