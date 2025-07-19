const express = require("express");
require("dotenv").config();
const route = require("./src/routes/user");
const Connection = require("./src/utils/db");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const cors = require("cors");

Connection();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true
}));
app.use(express.json());


app.use('/user', route)

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})