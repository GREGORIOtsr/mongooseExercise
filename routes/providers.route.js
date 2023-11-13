const express = require('express');
const router = express.Router();
const controller = require("../controllers/providers.controller");

router.get('/', controller.getProviders);
router.post('/', controller.createProvider);
router.put('/', controller.updateProvider);
router.delete('/', controller.deleteProvider);

module.exports = router;
