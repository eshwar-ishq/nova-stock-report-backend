const express = require('express');
const routes = express.Router();

const {getAllProducts, getAllProductsTesting} = require('../controllers/apicontrollers');

routes.route('/').get(getAllProducts);
routes.route('/testing').get(getAllProductsTesting);
routes.route('/pmsstock?Location=19').get(getBelmontStocks)

module.exports = routes;