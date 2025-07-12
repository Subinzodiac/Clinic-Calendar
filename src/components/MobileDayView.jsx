import React from "react";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";

export default function MobileDayView({ date, onSelect }) {
  return (
    <div className="mobile-day-view">
      <input
        type="date"
        value={date.toISOString().slice(0, 10)}
        onChange={e => onSelect(new Date(e.target.value))}
        className="mobile-date-picker"
      />
      <InfiniteCalendar
        selected={date}
        onSelect={onSelect}
        width="100%"
        height={window.innerHeight - 100}
        displayOptions={{ showHeader: false }}
        locale={{ todayLabel: 'Today' }}
      />
    </div>
  );
}
