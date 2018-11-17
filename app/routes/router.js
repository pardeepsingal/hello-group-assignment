/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */ 
router.use('/trade', require('./api/tradeRoutes'));
module.exports = router;