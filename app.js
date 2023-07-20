const express = require('express');
const cors = require('cors');
const app = express();

app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Adicione DELETE aqui se não estiver presente
    allowedHeaders: ['Content-Type', 'Authorization'], // Adicione outros headers personalizados se necessário
  }),
);

const bodyParser = require('body-parser');
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

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
