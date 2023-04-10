import "./App.css";
import Sidebar from "./components/Sidebar";
import HistoryData from "./components/ZabbixVoltage";

function App() {
  return (
    <div className="App">
      {/* <ZabbixAuth /> */}
      <Sidebar />
      <HistoryData />
    </div>
  );
}

export default App;
