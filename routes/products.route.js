const express = require('express');
const router = express.Router();
const controller = require("../controllers/products.controller");

router.get('/', controller.getProducts);
router.post('/', controller.createProduct);
router.put('/', controller.updateProduct);
router.delete('/', controller.deleteProduct);

module.exports = router;
