const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const port = Number(process.env.PORT || 8080);

const contentTypes = new Map([
    ['.html', 'text/html; charset=utf-8'],
    ['.js', 'text/javascript; charset=utf-8'],
    ['.css', 'text/css; charset=utf-8'],
    ['.json', 'application/json; charset=utf-8'],
    ['.svg', 'image/svg+xml'],
    ['.ico', 'image/x-icon'],
    ['.png', 'image/png'],
    ['.jpg', 'image/jpeg'],
    ['.jpeg', 'image/jpeg']
]);

function sendFile(response, filePath) {
    fs.readFile(filePath, (error, data) => {
        if (error) {
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.end('Not found');
            return;
        }

        const contentType = contentTypes.get(path.extname(filePath).toLowerCase()) || 'application/octet-stream';
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data);
    });
}

http.createServer((request, response) => {
    const urlPath = decodeURIComponent((request.url || '/').split('?')[0]);
    const normalizedPath = urlPath === '/' ? '/index.html' : urlPath;
    const filePath = path.join(rootDir, normalizedPath);

    if (!filePath.startsWith(rootDir)) {
        response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Bad request');
        return;
    }

    fs.stat(filePath, (error, stats) => {
        if (!error && stats.isFile()) {
            sendFile(response, filePath);
            return;
        }

        sendFile(response, path.join(rootDir, 'index.html'));
    });
}).listen(port, () => {
    console.log(`Performance demo server running at http://localhost:${port}/`);
});