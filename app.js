const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rotas importadas de router
app.use('/animais', require('./Routes/animalRoutes'));
app.use('/admin', require('./Routes/adminRoutes'));
app.use('/adotantes', require('./Routes/adotanteRoutes'));
app.use('/resgates', require('./Routes/resgateRoutes'));
app.use('/adocoes', require("./Routes/adocaoRoutes"))

const server = app.listen(3000, '0.0.0.0', function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
