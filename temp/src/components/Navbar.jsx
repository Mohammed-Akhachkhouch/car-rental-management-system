export default function Navbar() {
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
          <button className="btn btn--ghost">Login</button>
          <button className="btn btn--primary">Sign up</button>
        </div>
      </div>
    </header>
  );
}
