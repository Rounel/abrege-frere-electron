const { spawn } = require('child_process');
const path = require('path');

const nextLauncher = path.join(__dirname, '..', 'next-launcher.exe');

spawn(nextLauncher, {
  detached: true,
  stdio: 'ignore',
  windowsHide: true
}).unref();
