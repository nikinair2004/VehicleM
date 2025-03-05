import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Vehicle.css"; // Import CSS for styling

const Vehicle = () => {
  const [vehicle, setVehicle] = useState([]);

  useEffect(() => {
    const fetchAllVehicle = async () => {
      try {
        const res = await axios.get("http://localhost:8800/vehicle");
        setVehicle(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllVehicle();
  }, []);

  console.log(vehicle);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this record?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8800/vehicle/${id}`);
      setVehicle(vehicle.filter((v) => v.id !== id)); // Update state without reloading
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Vehicle Management System</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Category</th>
            <th>Make</th>
            <th>Colour</th>
            <th>Mileage</th>
            <th>Year</th>
            <th>Sold</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicle.map((v) => (
            <tr key={v.id}>
              <td>{v.category}</td>
              <td>{v.make}</td>
              <td>{v.colour}</td>
              <td>{v.mileage}</td>
              <td>{v.year}</td>
              <td>{v.sold}</td>
              <td>{v.price}</td>
              <td>
                <button className="delete" onClick={() => handleDelete(v.id)}>Delete</button>
                <button className="update">
                  <Link to={`/update/${v.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                    Update
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new vehicle
        </Link>
      </button>

      <button className="seegraph">
        <Link to="/graph" style={{ color: "inherit", textDecoration: "none" }}>
          Generate Bar Graph
        </Link>
      </button>
      <button className="seegraphpie">
        <Link to="/graphpie" style={{ color: "inherit", textDecoration: "none" }}>
          Generate Pie Chart
        </Link>
      </button>
      <button className="seereport">
        <Link to="/Vehiclereport" style={{ color: "inherit", textDecoration: "none" }}>
          Generate Report
        </Link>
      </button>
      <button className="searchvehicle">
        <Link to="/Vehiclesearch" style={{ color: "inherit", textDecoration: "none" }}>
          Search Records
        </Link>
      </button>
      
    </div>
  );
};

export default Vehicle;
