const express = require('express');
const bodyParser = require('body-parser');
const productosRoutes = require('./routes/productosRoutes');

const app = express();
const PORT = 10101;

app.use(bodyParser.json());

app.use('/productos', productosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;;