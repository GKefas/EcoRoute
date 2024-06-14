import express from "express";
import mysql from "mysql2";
import cors from "cors";
const PORT = process.env.PORT || 3001;

const app = express();

// Connection config
const db = mysql.createConnection({
  host: process.env.HOSTDB,
  user: process.env.USERDB,
  database: process.env.NAMEDB,
  password: process.env.PASSDB,
});

//Locally checking if DB is Connected
db.connect((err) => {
  if (err) console.error("Cant connect to EcoRouteDB: " + err);
});

//use() Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

//Importing Controllers (EndPoints)
import GeneralInfo from "./controllers/generalInfo.js";
import pricing from "./controllers/pricing.js";
import login from "./controllers/login.js";
import makeOrder from "./controllers/makeOrder.js";
import getOrders from "./controllers/getOrders.js";
import changePrice from "./controllers/changePrice.js";
import confirmOrder from "./controllers/confirmOrder.js";
import deleteOrder from "./controllers/deleteOrder.js";

//1 Getting fuel or some input from body and checking if there are gasStations with this input
app.get("/", (req, res) => {
  const gasStationRegex = "%" + req.query.input + "%"; //Do Like Instead of Where in case there is a search Input in frontEnd

  const query =
    "SELECT gasStationOwner,fuelCompNormalName,gasStationAddress,phone1,gasStationLat,gasStationLong FROM gasstations WHERE fuelCompNormalName LIKE ? ;";

  db.execute(query, [gasStationRegex], (err, result, fields) => {
    if (err || result[0] === undefined) return res.status(400).json(); //If error or no Data dont return something handle it with the response of 400 at front end
    return res.json(result);
  });
});

//2 Getting General Info...Making 2 seperated sql queries Chained queries because some gasStations may havent added fuels yet and with DISTINCT and join query there would be a mistake for gasStation COUNT
app.get("/generalInfo", (req, res) => {
  GeneralInfo(req, res, db);
});

//3 GET pricing from CompanyName
app.get("/pricing", (req, res) => {
  pricing(req, res, db);
});

//4 User Login
app.post("/login", (req, res) => {
  login(req, res, db);
});

//5 Make Order
app.post("/makeOrder", (req, res) => {
  makeOrder(req, res, db);
});

//6 Getting Orders from GasStationOrder
app.get("/getOrders", (req, res) => {
  getOrders(req, res, db);
});

//7 Change Fuel Price
app.put("/changePrice", (req, res) => {
  changePrice(req, res, db);
});

//9 Order Confirm
app.put("/confirmOrder", (req, res) => {
  confirmOrder(req, res, db);
});

//10 Delete Order
app.delete("/deleteOrder", (req, res) => {
  deleteOrder(req, res, db);
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`listening on ${PORT}...`);
});
