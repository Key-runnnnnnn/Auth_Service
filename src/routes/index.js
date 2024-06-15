const express = require('express');

const v1ApiRputes = require('./v1/index')

const router = express.Router();

router.use('/v1', v1ApiRputes);

module.exports = router;