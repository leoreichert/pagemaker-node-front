var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
const PORT = process.env.PORT || 5000

http.createServer(function (pedido, resposta) {
    var contentTypes = {
        'html': 'text/html',
        'css': 'text/css',
        'ico': 'image/x-icon',
        'png': 'image/png',
        'svg': 'image/svg+xml',
        'js': 'application/javascript',
        'otf': 'application/x-font-otf',
        'ttf': 'application/x-font-ttf',
        'eot': 'application/vnd.ms-fontobject',
        'woff': 'application/x-font-woff',
        'woff2': 'application/font-woff2',
        'zip': 'application/zip',
        'jpg': 'image/jpg',
    };
    var ficheiro = '';
    var caminho = url.parse(pedido.url).pathname;
    if (caminho === '/') {
        ficheiro = path.join(__dirname, caminho, 'index.html');
    } else {
        ficheiro = path.join(__dirname, caminho);
    }

    fs.readFile(ficheiro, function (erro, dados) {
        if (erro) {
            resposta.writeHead(404);
            resposta.end();
        } else {
            var extensao = path.extname(ficheiro).slice(1);
            resposta.setHeader('Content-Type', contentTypes[extensao]);
            resposta.end(dados);
        }
    });

})  .listen(PORT, () => console.log(`Listening on ${ PORT }`));