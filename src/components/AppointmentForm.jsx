import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const doctors = ["Dr. Sukumaran", "Dr. Prakash", "Dr. Salman", "Dr.Biju"];
const patients = ["Appu", "Anu", "Alice", "Arjun"];

export default function AppointmentForm() {
  const [patient, setPatient] = useState(patients[0]);
  const [doctor, setDoctor] = useState(doctors[0]);
  const [time, setTime] = useState("09:00");
  const [success, setSuccess] = useState(false); 

  const navigate = useNavigate();
  const { state } = useLocation();
  const date = state?.date || new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = new Date(date).toDateString();
    const newAppt = { patient, doctor, time };
    const stored = JSON.parse(localStorage.getItem("appointments")) || {};
    const updated = {
      ...stored,
      [key]: [...(stored[key] || []), newAppt],
    };
    localStorage.setItem("appointments", JSON.stringify(updated));
    
    setSuccess(true); 
    
    setTimeout(() => {
      navigate("/calendar");
    }, 1500); 
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Add Appointment</h3>

      {success && (
        <div style={{ 
          padding: "0.5rem 1rem", 
          backgroundColor: "#d4edda", 
          color: "#155724", 
          borderRadius: "4px", 
          marginBottom: "1rem", 
          border: "1px solid #c3e6cb" 
        }}>
          Appointment added successfully!
        </div>
      )}

      <label>Patient:
        <select value={patient} onChange={(e) => setPatient(e.target.value)}>
          {patients.map((p) => <option key={p}>{p}</option>)}
        </select>
      </label>

      <label>Doctor:
        <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
          {doctors.map((d) => <option key={d}>{d}</option>)}
        </select>
      </label>

      <label>Time:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/calendar")}>Cancel</button>
      </div>
    </form>
  );
}
