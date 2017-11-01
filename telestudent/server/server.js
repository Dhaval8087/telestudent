var express = require('express'),
//path = require('path'),
compression = require('compression'),
blocks=require('./api/blocksApi.js'),
app = express();
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
extended: true
}));

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.set('port', process.env.PORT || 5000);

app.use(compression());
app.use(busboy());

app.get('/getBlocks',blocks.getBlocks);

app.listen(app.get('port'), function () {
console.log('Express server listening on port ' + app.get('port'));
});
