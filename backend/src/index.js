const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routeHandlers = require('./RouteHandlers/routeHandlers');
require('dotenv').config({ path: '../mongo.env' });

const app = express();
app.use(cors()); // This enables CORS for all routes
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
  console.log('Connected to User MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/', routeHandlers);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});