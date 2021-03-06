var express = require('express');
var fs = require('fs');
var http = require('http');
var app = express();
app.use(express.static('./dist'));
app.use(function (req, res,next) {
  res.sendfile('./dist/index.html');
});
var httpsServer = http.createServer(app);
httpsServer.listen(5001, function () {
  var host = httpsServer.address().address;
  var port = httpsServer.address().port;
  console.log('app listening at http://%s:%s', host, port);
});