import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import mark from "../assets/chahid-mark.svg";

function navClass({ isActive }) {
  return isActive ? "nav__link nav__link--active" : "nav__link";
}

export default function Navbar() {
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label="Ste CHAHID CAR home">
          <img className="nav__logoMark" src={mark} alt="CHAHID CAR mark" />
          <div className="nav__brandText">
            <span className="nav__namePrefix">Ste</span>
            <strong className="nav__nameMain">CHAHID CAR</strong>
            <span className="nav__tagline">LOCATION DE VOITURE</span>
          </div>
        </Link>

        <button
          type="button"
          className="nav__menuBtn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>

        <nav className={menuOpen ? "nav__links nav__links--open" : "nav__links"}>
          <NavLink to="/" className={navClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/cars" className={navClass} onClick={closeMenu}>
            Cars
          </NavLink>
          <NavLink to="/contact" className={navClass} onClick={closeMenu}>
            Contact
          </NavLink>
          <NavLink to="/admin/login" className={navClass} onClick={closeMenu}>
            Admin
          </NavLink>
        </nav>

        <div className="nav__actions">
          <button className="btn btn--ghost" onClick={() => nav("/login")}>
            Login
          </button>

          <button className="btn btn--primary" onClick={() => nav("/signup")}>
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
