const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const { validate } = require('../middlewares/auth.middleware');
const schema = require('../schemas');

router.post('/register',validate(schema.reqBodySchema, 'body'), controller.register);
router.post('/login',validate(schema.reqBodySchema, 'body'), controller.login);
router.get('/verify',validate(schema.reqHeaderSchema, 'headers'), controller.verify);

module.exports = router;