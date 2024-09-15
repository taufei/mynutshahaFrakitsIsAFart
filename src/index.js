var fs = require('fs');
var { spawn } = require('child_process');

var isWatch = process.argv.includes('--watch');
process.argv = process.argv.filter(arg => arg != '--watch');

function startChild() {
    console.log('Starting build process...');

    child = spawn('node', ['src/build.js', ...process.argv], {
        stdio: 'inherit'
    });

    child.on('exit', function (code) {
        if(isWatch) {
			console.log("Watching for file changes... Press Ctrl+C to stop.");
		}
    });
}

function restartChild() {
    if (child) {
        console.log('Restarting build process...');
        child.kill();
        startChild();
    } else {
        startChild();
    }
}

startChild();

if (isWatch) {
    fs.watch('./src/', { recursive: true }, (eventType, filename) => {
        if (filename) {
            console.log(`${filename} changed. Rebuilding...`);
            restartChild();
        }
    });

    setInterval(() => {}, 1000);
}