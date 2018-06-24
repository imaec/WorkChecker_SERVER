var express = require('express');
var bodyParser = require('body-parser');
var userRouter = require('./userRouter');
var workRouter = require('./workRouter');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

/*app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});*/

app.use(userRouter);
app.use(workRouter);


// ¿¡·¯
app.use(function(req, res, next) {
  res.sendStatus(404);  
});

app.use(function(status, body) {
   res.status(status).send(body);
});

app.listen(3000, function() {
	console.log('server is listening 3000');
});