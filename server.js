const compression = require("compression");
const express = require("express");

let app = express();

app.use(compression())

app.use(express.static("dist"));

app.listen(process.env.PORT, () => console.log(`serve static assets on ${process.env.PORT}`));