import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dbConnection from "./database/database.js";
import customerRouter from "./routes/customer.route.js";
import cartRouter from "./routes/cart.route.js";

const app = express();
const port = 8000;

app.use(cors());
dbConnection();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    res.status(200).json({ message: "server is running" });
});

app.use("/customers", customerRouter);
app.use("/cart", cartRouter);


app.listen(port, function () {
	console.log(`Server is listening on port ${port}!`); 
});