import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === import.meta.env.VITE_CLINIC_USER  && password === import.meta.env.VITE_CLINIC_PASS ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/calendar");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Clinic Staff Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}