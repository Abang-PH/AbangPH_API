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

const cityRouter = require("./routes/cities");
app.use("/cities", cityRouter);

const transpoServiceRouter = require("./routes/transposervices");
app.use("/transposervices", transpoServiceRouter);

const driverRouter = require("./routes/drivers");
app.use("/drivers", driverRouter);

const vehicleRouter = require("./routes/vehicles");
app.use("/vehicles", vehicleRouter);

app.listen(3000, () => console.log("Server Started"));
