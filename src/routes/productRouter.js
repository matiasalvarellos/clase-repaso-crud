const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/list', productController.list);
router.get('/detail/:id', productController.detail);
router.get('/create-form', productController.create);
router.post('/create-process', productController.processCreate);
router.get('/edit/:id', productController.edit);
router.put('/edit-process/:id', productController.update);
router.delete('/delete/:id', productController.destroy);

module.exports = router;