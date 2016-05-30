var express = require('express');
var router = express.Router();
var controller = require('../controllers/main.js');

router.get('/', controller.index);
router.get('/favorite/:ruleset', controller.getFavorite);
router.post('/savefavorite', controller.savefavorite);
//router.put('/viewed', controller.editnumviews);
//router.delete('/favorite/:id', controller.delete);

module.exports = router;