require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogRouter = require("./blog.router.js");

const PORT = 9000;
const HOST = "localhost";

app.use("/", blogRouter);

app.set("view engine", "pug");
app.set("views", "./views");

const appstart = async (PORT, HOST) => {
    try {
        const connexionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        console.log(connexionString);
        await mongoose.connect(connexionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await app.listen(PORT);
        console.log(
            `le seveur ${HOST} est disponible à l'adresse: http://localhost:${PORT}`
        );
    } catch (e) {
        console.log(e);
    }
};

app.use(express.static("./public"));

appstart(PORT, HOST);
