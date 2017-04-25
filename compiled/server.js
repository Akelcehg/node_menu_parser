"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const api_routes_1 = require("./routes/api_routes");
const app = express();
const port = 3000;
app.use('/api', api_routes_1.ApiRoutes);
//let router = express.Router();
/*
app.get ('/', function (req, res){
  res.send('Hello World!');
});*/
/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
//# sourceMappingURL=server.js.map