import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [vehicle, setVehicle] = useState({
    category: "",
    make: "",
    colour: "",
    mileage: null,
    year: null,
  });

  
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setVehicle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/vehicle", vehicle);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
<h1> Vehicle Management System</h1>
      <h2>Add New Vehicle</h2>
      <input
        type="text"
        placeholder="Vehicle category"
        name="category"
        onChange={handleChange}
      />

      <textarea
        rows={5}
        type="text"
        placeholder="Vehicle make"
        name="make"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Vehicle colour"
        name="colour"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Vehicle mileage"
        name="mileage"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Vehicle year"
        name="year"
        onChange={handleChange}
      />
      <input
        type="sold"
        placeholder="Vehicle sold"
        name="sold"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Vehicle price"
        name="price"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all vehicle</Link>
    </div>
  );
};

export default Add;