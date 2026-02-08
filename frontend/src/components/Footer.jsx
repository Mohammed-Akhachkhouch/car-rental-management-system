import { Link } from "react-router-dom";
import mark from "../assets/chahid-mark.svg";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__brandHeader">
            <img className="footer__logoMark" src={mark} alt="CHAHID CAR mark" />
            <div className="footer__brandText">
              <span className="footer__namePrefix">Ste</span>
              <strong className="footer__nameMain">CHAHID CAR</strong>
              <span className="footer__tagline">LOCATION DE VOITURE</span>
            </div>
          </div>
          <p className="footer__text">
            Premium location de voiture experience for family, business, and
            holiday travel.
          </p>
        </div>

        <div>
          <h4 className="footer__title">Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4 className="footer__title">Support</h4>
          <a href="tel:+212600000000">+212 6 00 00 00 00</a>
          <a href="mailto:contact@chahidcar.ma">contact@chahidcar.ma</a>
          <Link to="/admin/login">Admin Access</Link>
        </div>
      </div>

      <div className="container footer__bottom">
        © {new Date().getFullYear()} CHAHID CAR. All rights reserved.
      </div>
    </footer>
  );
}
