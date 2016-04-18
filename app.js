var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/',function (request, response) {
	response.sendFile(__dirname + '/public/index.html');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//app.listen(3000, function () {
  //console.log('Example app listening on port 3000!');
//});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening on 3000');
});
