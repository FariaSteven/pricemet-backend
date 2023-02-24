const router = require('express').Router();

const productsRouter = require('./products');
const usersRouter = require('./users');

router.use('/', productsRouter);
router.use('/', usersRouter);

module.exports = router;