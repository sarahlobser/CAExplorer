var express = require('express');
var router = express.Router();
var controller = require('../controllers/main.js');

router.get('/', controller.index);
router.get('/favorite/:ruleset', controller.getFavorite);
router.post('/savefavorite', controller.savefavorite);

module.exports = router;