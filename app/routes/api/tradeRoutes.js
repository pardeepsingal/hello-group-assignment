/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const TradeController = require('../../controller/tradeController');
const tradeController = new TradeController();

/**
 * Trade Entity routes
 */
router.get('/count', function (req, res) {
    tradeController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    tradeController.exists(req, res);
});

router.get('/:id', function (req, res) {
    tradeController.findById(req, res);
});

router.get('/', function (req, res) {
    tradeController.findAll(res);
});

router.put('/:id', function (req, res) {
    tradeController.update(req, res);
});

router.post('/trades', function (req, res) {
    tradeController.create(req, res);
});

router.delete('/erase', function (req, res) {
    tradeController.erase(req, res);
});

router.delete('/:id', function (req, res) {
    tradeController.deleteById(req, res);
});

module.exports = router;