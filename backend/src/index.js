require('dotenv').config({ path: '../mongo.env' });

// Import necessary modules
const express = require('express')
const app = express()
const port = process.env.PORT

// Middleware to parse JSON bodies
app.use(express.json());

// Import and use the router from routeHandlers.js
const router = require('./routeHandlers')
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});