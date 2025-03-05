import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Vehicle from "./pages/Vehicle";
import Vehiclesearch from "./pages/Vehiclesearch";
import Vehiclereport from "./pages/Vehiclereport";
import Update from "./pages/Update";
import "./style.css"



import Graph from "./pages/Graph"; // Import Graph page
import Graphpie from "./pages/Graphpie"; // Import Graph page
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vehicle />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/graph" element={<Graph />} /> {/* Add Graph route */}
          <Route path="/graphpie" element={<Graphpie />} /> {/* Add GraphPieroute */}
          <Route path="/Vehiclesearch" element={<Vehiclesearch />} /> {/* Search */}
          <Route path="/Vehiclereport" element={<Vehiclereport />} /> {/* Report */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
