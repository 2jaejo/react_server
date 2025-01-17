const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);

router.get('/:id', itemController.getItemById);

router.post('/', itemController.addItem);

router.put('/', itemController.setItem);

router.delete('/:id', itemController.delItem);

module.exports = router;