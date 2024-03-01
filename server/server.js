import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dbConnection from "./database/database.js";

const app = express();
const port = 8000;

app.use(cors());
dbConnection();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    res.status(200).json({ message: "server is running" });
});

app.listen(port, function () {
	console.log(`Server is listening on port ${port}!`); 
});