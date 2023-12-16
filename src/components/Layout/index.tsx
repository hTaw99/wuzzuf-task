import Styles from "./Layout.module.css";

import Header from "./Header";
import Searchbar from "./SearchBar";
import { useLocation, Outlet } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const regex = new RegExp("/(job|skill)/.*");
  return (
    <div>
      <Header />
      {regex.test(location.pathname) ? undefined : <Searchbar />}
      <main className={`${Styles.main_container}`}>
        <div className={`container`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
