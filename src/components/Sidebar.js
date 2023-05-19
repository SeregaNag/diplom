import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Sidebar.css";
import useFetchHistoryData from "../hooks/useFetchHistoryData";

const Sidebar = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
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
  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    const selectedSession = sessions[index];
    const startTimestamp = selectedSession[selectedSession.length - 1].clock;
    const endTimestamp = selectedSession[0].clock;
    props.setDateRange({ startTimestamp, endTimestamp });
  };


  return (
    <div className="sidebar-container">
      <h2>Выберите диапазон дат:</h2>
      <form>
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
      </form>
      {historyData.length > 0 ? (
        <div>
          <h3>Сессии за выбранный период:</h3>
          <ol>
            {sessions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(index)}
                className={selectedItemIndex === index ? "selected" : ""}
              >
                {new Date(item[item.length - 1].clock * 1000).toLocaleString()}{" "}
                - {new Date(item[0].clock * 1000).toLocaleString()}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div>Нет данных за выбранный период.</div>
      )}
    </div>
  );
};

export default Sidebar;
