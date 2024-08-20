const express = require('express');
const cors = require('cors');
const routeHandlers = require('./RouteHandlers/routeHandlers');

const app = express();
app.use(cors()); // This enables CORS for all routes
app.use(express.json());

app.use('/', routeHandlers);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});