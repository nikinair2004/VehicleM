import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFA", "#FA8072"];

const Graphpie = () => {
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
        const formattedData = data.map((vehicle) => ({
          name: vehicle.category, // Use category for labeling
          mileage: vehicle.mileage // Correctly use mileage for graph
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
      <h1>Vehicle Mileage Distribution</h1>
      <h2>Mileage distribution by vehicle category</h2>
      <Link to="/">See all vehicles</Link>
      {vehicleData.length === 0 ? (
        <p>No vehicle data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={vehicleData}
              dataKey="mileage" // Use mileage instead of sold
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {vehicleData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Graphpie;
