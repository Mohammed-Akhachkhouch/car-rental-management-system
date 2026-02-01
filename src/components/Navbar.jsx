import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  return (
    <header className="nav">
      <div className="container nav__inner">
        <div className="nav__logo">DriveEase</div>

        <nav className="nav__links">
          <a href="#home">Home</a>
          <a href="#cars">Cars</a>
          <a href="#offers">Offers</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav__actions">
          <button
            className="btn btn--ghost"
            onClick={() => nav("/login")}
          >
            Login
          </button>

          <button
            className="btn btn--primary"
            onClick={() => nav("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
