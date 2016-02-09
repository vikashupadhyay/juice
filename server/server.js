var router = require('./router');
var http = require('http');

http.createServer(router).listen(3000);