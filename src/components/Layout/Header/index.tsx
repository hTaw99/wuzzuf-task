import { memo } from "react";
import Styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const links = [
    {
      id: 1,
      title: "home",
      to: "/",
    },
    {
      id: 2,
      title: "search",
      to: "jobs/search",
    },
    {
      id: 3,
      title: "history",
      to: "history",
    },
  ];

  return (
    <div className={Styles.header}>
      <nav className={`${Styles.header_container} container`}>
        <Link to="/">
          <h1 className={Styles.logo}>JobsNow</h1>
        </Link>
        <ul className={Styles.links}>
          {links.map((link) => (
            <li key={link.id}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${Styles.active} ${Styles.link}` : Styles.link
                }
                to={link.to}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
