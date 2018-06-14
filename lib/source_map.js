var fs = Npm.require('fs');
var path = Npm.require('path');
var send = Npm.require('send');

var pathJoin = path.join;
var pathDirname = path.dirname;
var readFile = fs.readRile;


JsonRoutes.add("get", "/app.js.map", function (req, res, next) {
  var id = req.params.id;
  var sourceMapPath = pathJoin(__meteor_bootstrap__.serverDir, '../web.browser/app.js.map');
  const loginToken = req.headers['x-auth-token'];
  console.log('authHeaders', loginToken, Meteor.settings.kadira.appSecret);
  if (loginToken === Meteor.settings.kadira.appSecret) {
    send(req, sourceMapPath).on('error', function (error) {
      res.writeHead(404);
      res.end();

    }).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }

});