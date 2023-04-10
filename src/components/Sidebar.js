import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Sidebar.css";

const Sidebar = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    </div>
  );
};

export default Sidebar;
