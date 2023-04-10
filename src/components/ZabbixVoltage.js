import useFetchHistoryData from "../hooks/useFetchHistoryData";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./ZabbixVoltage.css";

const HistoryData = () => {
  const hostIdsVoltageIn = ["10580"];
  const itemIdsVoltageIn = ["44797"];
  const dataVoltageIn = useFetchHistoryData(hostIdsVoltageIn, itemIdsVoltageIn);
  const hostIdsVoltageOut = ["10580"];
  const itemIdsVoltageOut = ["44799"];
  const dataVoltageOut = useFetchHistoryData(
    hostIdsVoltageOut,
    itemIdsVoltageOut
  );
  const hostIdsCurrentOut = ["10580"];
  const itemIdsCurrentOut = ["44798"];
  const dataCurrentOut = useFetchHistoryData(
    hostIdsCurrentOut,
    itemIdsCurrentOut
  );

  const sessions = [];
  let currentSession = [];
  dataCurrentOut.forEach((item, index) => {
    const voltageIn = dataVoltageIn[index]?.value || 0;
    const voltageOut = dataVoltageOut[index]?.value || 1;
    const value = (voltageOut / voltageIn) * 100;
    console.log(value);

    // Если значение равно 0, то сессия зарядки закончилась
    if (
      Boolean(isNaN(value) || item.value === "0") &&
      currentSession.length > 0
    ) {
      sessions.push(currentSession);
      currentSession = [];
    }

    // Добавляем только те объекты, у которых свойство value не NaN
    if (
      Boolean(!isNaN(value)) &&
      Boolean(item.value !== "0") &&
      Boolean(isFinite(value))
    ) {
      currentSession.push({
        name: item.value,
        value,
      });
    }
  });
  // Добавляем последнюю сессию, если она не закончилась
  if (currentSession.length > 0) {
    sessions.push(currentSession);
  }

  const formatYAxis = (value) => {
    return value.toFixed(2) + "%";
  };

  console.log(sessions);

  return (
    <div className="history-data-container">
      <h2>Исторические данные</h2>
      <div className="history-data">
        {sessions.map((session, index) => (
          <div className="history-chart" key={index}>
            <LineChart width={600} height={300} data={session}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>
        ))}
        <div className="container">
          <div className="column">
            <h3>DataVoltageIn</h3>
            <ul>
              {dataVoltageIn.map((item) => (
                <li key={item.ns}>
                  {new Date(item.clock * 1000).toLocaleString()} - {item.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="column">
            <h3>DataVoltageOut</h3>
            <ul>
              {dataVoltageOut.map((item) => (
                <li key={item.ns}>
                  {new Date(item.clock * 1000).toLocaleString()} - {item.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="column">
            <h3>DataCurrentOut</h3>
            <ul>
              {dataCurrentOut.map((item) => (
                <li key={item.ns}>
                  {new Date(item.clock * 1000).toLocaleString()} - {item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryData;