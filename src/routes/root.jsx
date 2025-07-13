import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Root() {
  const location = useLocation();
  const hideHeaderOn = ["/", "/login"];

  return (
    <>
      {!hideHeaderOn.includes(location.pathname) && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  );
}
