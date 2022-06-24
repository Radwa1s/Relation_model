const sql = require("mysql");
const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const { EUCJPMS_BIN } = require("mysql/lib/protocol/constants/charsets");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "Radwaradwa",
  database: "hotel",
});

//connect to db
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

app.get("/createhoteltable", (req, res) => {
  let sql =
    "CREATE TABLE hotel (hotel_id INT auto_increment,hotel_name varchar(30),primary key(hotel_id))";
  db.query(sql, (error) => {
    if (error) {
      console.log(error.massage);
      throw error;
    }
  });
  console.log("table created");
  res.end();
});

app.get("/createemployeetable", (req, res) => {
  let sql =
    "CREATE TABLE employee (employee_id int auto_increment,employee_name varchar(30),employee_specialty varchar(20),hotel_id int NOT NULL,FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id),primary key(employee_id))";
  db.query(sql, (error) => {
    if (error) {
      console.log(error.massage);
      throw error;
    }
  });
  console.log("employee table created..");
  res.end();
});

app.get("/hoteltype", (req, res) => {
  let sql =
    "CREATE TABLE type (type_id int auto_increment,type_name varchar(20),hotel_id int NOT NULL ,FOREIGN KEY(hotel_id) REFERENCES hotel(hotel_id),PRIMARY KEY(type_id))";
  db.query(sql, (error) => {
    if (error) {
      console.log(error.massage);
      throw error;
    }
  });
  console.log("type table created.. ");
  res.end();
});

app.get("/rooms", (req, res) => {
  let sql =
    "CREATE TABLE rooms (room_id int auto_increment,floor int, hotel_id int NOT NULL ,FOREIGN KEY(hotel_id) REFERENCES hotel(hotel_id),PRIMARY KEY(room_id))";
  db.query(sql, (error) => {
    if (error) {
      console.log(error.massage);
      throw error;
    }
  });
  console.log("rooms table created .. ");
  res.end();
});

app.get("/category", (req, res) => {
  let sql =
    "CREATE TABLE category (category_id int auto_increment,category_name varchar(40),price int ,beds_number int,hotel_id int NOT NULL,room_id int NOT NULL, FOREIGN KEY(hotel_id) REFERENCES hotel(hotel_id), FOREIGN KEY(room_id) REFERENCES rooms(room_id),primary key(category_id))";
  db.query(sql, (error) => {
    if (error) {
      console.log(error);
      throw error;
    }
  });
  console.log("category table created ..");
  res.end();
});
app.listen(port, () => {
  console.log("server running on 4000");
});
