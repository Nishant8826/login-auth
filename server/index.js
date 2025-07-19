const express = require("express");
require("dotenv").config();
const route = require("./src/routes/user");
const Connection = require("./src/utils/db");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");

Connection();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())


app.use('/user', route)

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})