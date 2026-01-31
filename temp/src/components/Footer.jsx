export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__grid">
        <div>
          <div className="footer__logo">DriveEase</div>
          <p className="footer__text">
            Premium car rental experience for your next trip.
          </p>
        </div>

        <div>
          <h4 className="footer__title">Company</h4>
          <a href="#home">About</a>
          <a href="#cars">Cars</a>
          <a href="#offers">Offers</a>
        </div>

        <div>
          <h4 className="footer__title">Support</h4>
          <a href="#contact">Help Center</a>
          <a href="#contact">Contact</a>
          <a href="#contact">Terms</a>
        </div>
      </div>

      <div className="container footer__bottom">
        © {new Date().getFullYear()} DriveEase. All rights reserved.
      </div>
    </footer>
  );
}
