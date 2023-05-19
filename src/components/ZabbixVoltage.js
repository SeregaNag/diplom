import useFetchHistoryData from "../hooks/useFetchHistoryData";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./ZabbixVoltage.css";
import EffGraph from "./EffGraph";

const HistoryData = (props) => {
  const { startTimestamp, endTimestamp } = props.dateRange;
  const hostIdsVoltageIn = ["10580"];
  const itemIdsVoltageIn = ["44797"];
  const dataVoltageIn = useFetchHistoryData(
    hostIdsVoltageIn,
    itemIdsVoltageIn,
    startTimestamp,
    endTimestamp
  );
  const hostIdsVoltageOut = ["10580"];
  const itemIdsVoltageOut = ["44799"];
  const dataVoltageOut = useFetchHistoryData(
    hostIdsVoltageOut,
    itemIdsVoltageOut,
    startTimestamp,
    endTimestamp
  );
  const hostIdsCurrentOut = ["10580"];
  const itemIdsCurrentOut = ["44798"];
  const dataCurrentOut = useFetchHistoryData(
    hostIdsCurrentOut,
    itemIdsCurrentOut,
    startTimestamp,
    endTimestamp
  );

  const sessions = [];
  let currentSession = [];
  dataCurrentOut.forEach((item, index) => {
    const voltageIn = Number(dataVoltageIn[index]?.value) || 0;
    const voltageOut = Number(dataVoltageOut[index]?.value) || 0;
    const value = (voltageOut / voltageIn) * 100;

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
        efficiency: value,
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Умножаем на 1000, так как таймстамп в миллисекундах
    const formattedDate = date.toLocaleString(); // Используем метод toLocaleString для получения форматированной даты
    return formattedDate;
  };

  const maxName = sessions.reduce((prev, curr) => {
    const max = Math.max(...curr.map((item) => item.name));
    return max > prev ? max : prev;
  }, 0);

  const minVoltage = sessions.reduce((prev, curr) => {
    const min = Math.min(...curr.map((item) => item.efficiency));
    return min > prev ? min : prev;
  }, 0);

  return (
    <div className="history-data-container">
      <h2>Исторические данные о сессии</h2>
      <div className="history-data">
        {sessions.length <= 1 &&
          sessions.map((session, index) => (
            <div className="history-chart" key={index}>
              <LineChart width={1000} height={600} data={session}>
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatYAxis} domain={[80, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="efficiency" stroke="#8884d8" />
              </LineChart>
            </div>
          ))}
        <p>Максимальный ток: {maxName}</p>
        <p>Минимальная эффективность: {minVoltage.toFixed(2) + "%"}</p>
        {sessions.length == 1 && (
          <EffGraph
            startTimestamp={startTimestamp}
            endTimestamp={endTimestamp}
          />
        )}
      </div>
    </div>
  );
};

export default HistoryData;
