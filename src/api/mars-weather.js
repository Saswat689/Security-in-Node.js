const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down')

const limiter = rateLimit({
  windowMs: 30 * 1000, // 15 minutes
  max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})

const speedLimiter = slowDown({
  windowMs: 30 * 1000, // 15 minutes
  delayAfter: 3, // allow 5 requests to go at full-speed, then...
  delayMs: 500 // 6th request has a 100ms delay, 7th has a 200ms delay, 8th gets 300ms, etc.
});

const router = express.Router();

const BASE_URL = 'https://api.nasa.gov/insight_weather/?';

let cachedData;
let cacheTime;

//probably some form of auth
//here we are using dummy api keys for simplicity.
const apiKeys = new Map();
apiKeys.set('ethics',true)

router.get('/', limiter,speedLimiter,(req,res,next) => {
  const apiKey = req.get('X-API-KEY') //you can also specify it in search param;
  if(apiKeys.has(apiKey)) {
    next()
  } else {
    const error = new Error('Invalid API KEY');
    next(error)
  }
}, async (req, res,next) => {
  try{
    //in memory cache
    if(cacheTime && cacheTime > Date.now() - 30 * 1000) {
      return res.json(cachedData);
    }
    const params = new URLSearchParams({
      api_key:process.env.API_KEY,
      feedtype: 'json',
      ver: '1.0'
    })
  // using proxy

  //1 make a req to the nasa api
  const { data } = await axios.get(`${BASE_URL}${params}`)

  //2 respond to this request with data from nasa api

  cachedData = data;
  cacheTime = Date.now()
  data.cacheTime = cacheTime
  return res.json(data)

} catch (err) {
  return next(err)
}

});

module.exports = router;
