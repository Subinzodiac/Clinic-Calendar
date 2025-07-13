import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function MobileDayView({ date, onSelect }) {
  const handleSelect = d => {
    if (d instanceof Date && !isNaN(d)) {
      onSelect(d);
    }
  };

  return (
    <div className="mobile-day-view">
      <input
        type="date"
        value={date instanceof Date ? date.toISOString().slice(0, 10) : ""}
        onChange={e => handleSelect(new Date(e.target.value))}
        className="mobile-date-picker"
      />
      <div style={{ height: "calc(100vh - 80px)", overflowY: "auto" }}>
        <DayPicker
          mode="single"
          selected={date instanceof Date ? date : undefined}
          onSelect={handleSelect}
          numberOfMonths={1}
          fixedWeeks
          styles={{ root: { width: "100%" } }}
        />
      </div>
    </div>
  );
}
