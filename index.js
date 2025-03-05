import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sundaran12",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("Hellow VNIT : Welcome to Backend");
});

app.get("/vehicle", (req, res) => {
  const q = "SELECT * FROM vehicle";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});



app.post("/vehicle", (req, res) => {
  const q = "INSERT INTO vehicle(`category`,`make`,`colour`,`mileage`,`year`,`sold`,`price`) VALUES (?)";

  const values = [
    req.body.category,
    req.body.make,
    req.body.colour,
    req.body.mileage,
    req.body.year,
    req.body.sold,
    req.body.price,
  ];
  

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/vehicle/:id", (req, res) => {
  const vehilecId = req.params.id;
  const q = " DELETE FROM vehicle WHERE id = ? ";

  db.query(q, [vehilecId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/vehicle/:id", (req, res) => {
  const vehicleId = req.params.id;
  const q = "UPDATE vehicle SET `category`= ?,`make`= ?, `colour`= ?, `mileage`= ? , `year`= ? , `sold`= ? , `price`= ? WHERE id = ?";

  const values = [
    req.body.category,
    req.body.make,
    req.body.colour,
    req.body.mileage,
    req.body.year,
    req.body.sold,
    req.body.price,
  ];

  db.query(q, [...values,vehicleId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
const vehicles = [
    { category: "Sedan", mileage: 30, sold: 15  ,price:5000000},
    { category: "SUV", mileage: 50 , sold: 30,price:4000000},
    { category: "Truck", mileage: 40 , sold: 10,price:10000000},
    { category: "Minivan", mileage: 20 , sold: 50,price:2000000}
  ];    
  
  app.get("/vehicles", (req, res) => {
    res.json(vehicles);
  });
  
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });