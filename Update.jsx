import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [vehicle, setVehicle] = useState({
    category: "",
    make: "",
    colour: "",
    mileage: null,
    year: null,
    sold: null,
    price: null,
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const vehicleId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setVehicle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
     await axios.put(`http://localhost:8800/vehicle/${vehicleId}`, vehicle);
      navigate("/");
    } catch (err) {

      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Vehicle</h1>
      <input
        type="text"
        placeholder="Vehicle tcategory"
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
        type="number"
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
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all vehicle</Link>
    </div>
  );
};

export default Update;

