const express = require('express');

const marsweather = require('./mars-weather');

const router = express.Router();

router.get('/', (req, res) => {
 res.redirect('/marsweather').status(200)
});

router.use('/marsweather', marsweather);

module.exports = router;
