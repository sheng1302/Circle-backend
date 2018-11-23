const express = require('express');
const router = express.Router();
const users = require('./users');
const items = require('./items'); 
const auth = require('./auth');
const orders = require('./orders');

router.use('/users', users);
router.use('/items', items);
router.use('/auth', auth);
router.use('/order', orders);
module.exports = router;
