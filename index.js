const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

const connectDB = require("./configs/mongodb.config");
const {index} = require("./routes/index.route");

const app = express();

const port = process.env.PORT;
const swaggerUi = require("swagger-ui-express");
const {swaggerSpec} = require("./docs/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


connectDB();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

index(app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});