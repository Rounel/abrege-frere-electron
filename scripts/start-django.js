const { spawn } = require('child_process');
const path = require('path');

const isWin = process.platform === 'win32';
const executableName = isWin ? 'start.exe' : 'start';

const djangoExe = path.join(__dirname, '..', executableName);

const djangoProcess = spawn(djangoExe, [], {
  cwd: path.dirname(djangoExe),
  detached: true,
  stdio: 'ignore',
  windowsHide: true,
});

djangoProcess.unref();
