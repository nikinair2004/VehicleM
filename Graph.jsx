import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Link } from "react-router-dom";

const Graph = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8800/vehicle")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Vehicle Data:", data);
        // Ensure the data contains 'category', 'mileage', and 'sold' fields
        const formattedData = data.map((vehicle) => ({
          category: vehicle.category,
          mileage: vehicle.mileage,
          sold: vehicle.sold // Added 'sold' field
        }));
        setVehicleData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading vehicle data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Vehicle Mileage and Sales Data</h2>
      {vehicleData.length === 0 ? (
        <p>No vehicle data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={vehicleData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="mileage" fill="#82ca9d" name="Mileage (km/l)" />
            <Bar dataKey="sold" fill="#8884d8" name="Sold Vehicles" /> {/* Added Sold Vehicles */}
          </BarChart>
        </ResponsiveContainer>
      )}
      <div className="mt-4">
        <Link to="/" className="text-blue-500 underline">See all vehicles</Link>
      </div>
    </div>
  );
};

export default Graph;
