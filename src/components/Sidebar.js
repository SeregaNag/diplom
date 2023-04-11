import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Sidebar.css";
import useFetchHistoryData from "../hooks/useFetchHistoryData";

const Sidebar = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const hostIdsCurrentOut = ["10580"];
  const itemIdsCurrentOut = ["44798"];
  const timeFrom = startDate ? startDate.getTime() / 1000 : null;
  const timeTill = endDate ? endDate.getTime() / 1000 : null;
  const historyData = useFetchHistoryData(
    hostIdsCurrentOut,
    itemIdsCurrentOut,
    timeFrom,
    timeTill
  );
  const sessions = [];
  let currentSession = [];
  historyData.forEach((item, index) => {
    if (item.value === "0" && currentSession.length > 0) {
      sessions.push(currentSession);
      currentSession = [];
    }
    if (item.value !== "0") {
      currentSession.push({
        clock: item.clock,
        ns: item.ns,
      });
    }
  });
  if (currentSession.length > 0) {
    sessions.push(currentSession);
  }

  console.log(sessions);

  const handleSubmit = (event) => {
    event.preventDefault();
    const startTimestamp = startDate.getTime() / 1000;
    const endTimestamp = endDate.getTime() / 1000;
    props.setDateRange({ startTimestamp, endTimestamp });
  };

  return (
    <div className="sidebar-container">
      <h2>Выберите диапазон дат:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="from">From:</label>
          <DatePicker
            id="from"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Выберите дату"
            isClearable
            showYearDropdown
            scrollableYearDropdown
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">To:</label>
          <DatePicker
            id="to"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Выберите дату"
            isClearable
            showYearDropdown
            scrollableYearDropdown
          />
        </div>
        <button type="submit">Применить</button>
      </form>
      {historyData.length > 0 ? (
        <div>
          <h3>Сессии за выбранный период:</h3>
          <ul>
            {sessions.map((item, index) => (
              <li
                key={index}
                onClick={() =>
                  props.setDateRange({
                    startTimestamp: item[item.length - 1].clock,
                    endTimestamp: item[0].clock,
                  })
                }
              >
                {new Date(item[item.length - 1].clock * 1000).toLocaleString()}{" "}
                - {new Date(item[0].clock * 1000).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Нет данных за выбранный период.</div>
      )}
    </div>
  );
};

export default Sidebar;
