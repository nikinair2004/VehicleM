import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const VehicleReport = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/vehicle");
        setVehicles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(vehicles);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vehicles");
    XLSX.writeFile(workbook, "Vehicle_Report.xlsx");
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Vehicle Report</h1>
      <div className="flex space-x-4 mb-4">
        <CSVLink
          data={vehicles}
          filename={"Vehicle_Report.csv"}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Export CSV
        </CSVLink>
        <button
          onClick={exportToExcel}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export Excel
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Vehicle Data Table</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Make</th>
              <th className="border p-2">Colour</th>
              <th className="border p-2">Mileage</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Sold</th>
              <th className="border p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border">
                <td className="border p-2">{vehicle.id}</td>
                <td className="border p-2">{vehicle.category}</td>
                <td className="border p-2">{vehicle.make}</td>
                <td className="border p-2">{vehicle.colour}</td>
                <td className="border p-2">{vehicle.mileage}</td>
                <td className="border p-2">{vehicle.year}</td>
                <td className="border p-2">{vehicle.sold}</td>
                <td className="border p-2">{vehicle.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Link to="/" className="text-blue-500 underline">See all vehicles</Link>
      </div>
    </div>
  );
};

export default VehicleReport;
