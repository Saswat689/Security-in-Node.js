# Security in Node.js

**How would you secure a web application backend without any form of user authentication ?**

Well in this project I tried to implement 4 crucial strategies for securing your Node API'S easily and effectively.

**The top 4 security implementations are**

- Using caching
- Limiting API requests in a specified time interval
- Slowing down response time after a lot of parallel requests.
- Using API KEYS

## API

- **API URL**

`/api/v1/marsweather`

*Return value:* Returns weather(some json object for demo purposes using the nasa api)
*Required Param:* AN API KEY in a custom X-API-KEY header. Set it to `ethics`.
*No of requests possible under 30s*: 3
*Slow down after*: 3 requests for 500ms(keeps increasing)

In memory cache is also implemented so as to decrease server load and response time.

## Getting started

**Clone the repo:**

`git clone <url>`

**Add a NASA API KEY**

Go to (nasa website)[https://api.nasa.gov/] and grab an api key. then in the src/.env file, enter:

`API_KEY=your_api_key`

**Nodemon**

`npm run dev`

**Execution**

`npm run start`

**ES LINT for fixing syntax errors**

`npm run lint`

Currently the api is not hosted, but I have set up everything to get up and running so you don't have to modify anything before hosting.
