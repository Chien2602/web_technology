const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

dotenv.config();
const port = process.env.PORT;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});