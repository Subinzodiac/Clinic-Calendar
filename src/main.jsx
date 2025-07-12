import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/root.jsx";
import ErrorPage from "./routes/error-page.jsx";
import Login from "./routes/login.jsx";
import Calendar from "./routes/calendar.jsx";
import AddAppointmentPage from "./routes/add-appointment.jsx";
import App from "./App.jsx";
import "./index.css";
import AboutPage from "./routes/about.jsx";
import ContactPage from "./routes/contact.jsx";

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/calendar", element: <Calendar /> },
      { path: "/add-appointment", element: <AddAppointmentPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);