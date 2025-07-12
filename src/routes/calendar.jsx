import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useMobile from "../hooks/useMobile";
import MobileDayView from "../components/MobileDayView";
import { useNavigate } from "react-router-dom";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState({});
  const [filter, setFilter] = useState({ doctor: "", patient: "" });
  const navigate = useNavigate();
  const isMobile = useMobile();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") navigate("/");
    const saved = localStorage.getItem("appointments");
    if (saved) setAppointments(JSON.parse(saved));
  }, [navigate]);

  const filtered = (appointments[date.toDateString()] || []).filter(a =>
    (filter.doctor ? a.doctor === filter.doctor : true) &&
    (filter.patient ? a.patient === filter.patient : true)
  );

  return (
    <div className="calendar-container">
      <h2>Appointment Calendar</h2>

      {isMobile ? (
        <MobileDayView date={date} onSelect={setDate} />
      ) : (
        <Calendar
          value={date}
          onClickDay={setDate}
          minDetail="month"
          maxDetail="month"
          showNeighboringMonth={false}
          prevLabel={null}
          nextLabel={null}
          navigationLabel={null}
        />
      )}

      <button
        className="add-appt-btn"
        onClick={() => navigate("/add-appointment", { state: { date } })}
      >
        Add Appointment
      </button>

      <div className="list-container">
        <h3>{date.toDateString()}</h3>
        <ul className="appointment-list">
          {filtered.map((appt, i) => (
            <li key={i}>
              {appt.time} — {appt.patient} with {appt.doctor}
              <button
                onClick={() => {
                  const list = [...appointments[date.toDateString()]];
                  list.splice(i, 1);
                  const all = { ...appointments, [date.toDateString()]: list };
                  setAppointments(all);
                  localStorage.setItem("appointments", JSON.stringify(all));
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="filters">
        <select onChange={e => setFilter({ ...filter, doctor: e.target.value })}>
          <option value="">All Doctors</option>
          {["Dr. Sukumaran", "Dr. Prakash", "Dr. Salman", "Dr. Biju"].map(d => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select onChange={e => setFilter({ ...filter, patient: e.target.value })}>
          <option value="">All Patients</option>
          {["Appu", "Anu", "Alice", "Arjun"].map(p => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
