var express = require('express');

var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/horas', function(request, response){
  response.end((new Date()).toDateString());
});

app.use('/', express.static('public'));

app.post('/clientes', function(request, response){
  console.log(request.body.nome);
  response.end('Obrigado pelo seu cadastro');
});

app.listen(8080);