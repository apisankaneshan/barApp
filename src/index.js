// const express = require("express");
// const app = express();

// const PORT = process.env.PORT || 3000;

// //For initial testing purposes
// app.get("/", (req, res) => {
//     res.send("<h2>Its working!</h2>");
// });

// app.listen(PORT, () => {
//     console.log(`API is listening on port ${PORT}`);
// });

const http = require("http");
const app = require('../app');

const port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(port);