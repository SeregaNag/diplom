import "./App.css";
import Sidebar from "./components/Sidebar";
import HistoryData from "./components/ZabbixVoltage";
import { useState } from "react";

function App() {
  const [dateRange, setDateRange] = useState({
    startTimestamp: 1677242559,
    endTimestamp: 1677242569,
  });
  console.log(dateRange);

  return (
    <div className="App">
      {/* <ZabbixAuth /> */}
      <Sidebar setDateRange={setDateRange} />
      <HistoryData dateRange={dateRange} />
    </div>
  );
}

export default App;
