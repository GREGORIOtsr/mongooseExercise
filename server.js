const express = require('express');
const app = express();
app.use(express.json())
const port = 3000;

const mongoose = require('./config/db_mongo');

const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

const providersRoutes = require('./routes/providers.route');
const productsRoutes = require('./routes/products.route');

app.get("/", (req, res) => {
    res.status(200).json({
      msg: "Ejercicio API rest MongoDB/Moongose",
      routes: {
        providers: "/api/providers",
        products: "/api/products",
      },
    });
  });

app.use('/api/providers', providersRoutes);
app.use('/api/products', productsRoutes);

app.use('*', error404);

app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
})
