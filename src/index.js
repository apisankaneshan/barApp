const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

//For initial testing purposes
app.get("/", (req, res) => {
    res.send("<h2>Its working!</h2>");
});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});