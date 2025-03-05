import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Vehicle.css"; // Import CSS for styling

const VehicleSearch = () => {
  const [vehicle, setVehicle] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/vehicle/${id}`);
      setVehicle(vehicle.filter((v) => v.id !== id)); // Remove deleted vehicle from state
    } catch (err) {
      console.log(err);
    }
  };

  const filteredVehicles = vehicle.filter((v) =>
    Object.values(v).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <h1>Vehicle Management System</h1>
      <input
        type="text"
        placeholder="Search vehicles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
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
          {filteredVehicles.map((v) => (
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
      <Link to="/">See all vehicle</Link>
      
    </div>
  );
};

export default VehicleSearch;
