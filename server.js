require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("open", (error) => console.log("Connected to database"));

app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
// localhost: 3000/subscribers

app.listen(3000, () => console.log("Server Started"));
