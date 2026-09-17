import { memo, useState } from "react";
import { Palette, Mail, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="gallery-footer">
      <div className="footer-top-newsletter">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3>Join The Collectors Circle</h3>
            <p>
              Receive private previews of new gallery acquisitions, artist monographs, and exclusive exhibition invitations.
            </p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="newsletter-input-wrapper">
              <Mail size={18} className="mail-icon" />
              <input
                type="email"
                placeholder="Enter your collector email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="newsletter-submit-btn">
              {subscribed ? (
                <>
                  <Check size={16} /> Subscribed
                </>
              ) : (
                <>
                  <span>Join Circle</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="footer-main-grid">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <Palette className="footer-brand-icon" size={26} />
            <span>CANVASORA</span>
          </div>
          <p className="footer-bio">
            An international online gallery connecting passionate collectors with extraordinary original paintings, contemporary canvas works, and museum-grade masterworks.
          </p>
          <div className="footer-social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" alt="Instagram" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src="https://www.svgrepo.com/show/382721/facebook.svg" alt="Facebook" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
              <img src="https://www.svgrepo.com/show/349537/twitter.svg" alt="X" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <img src="https://www.svgrepo.com/show/382710/youtube-you-tube-video.svg" alt="YouTube" />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Exhibition Catalog</h4>
          <ul className="footer-links">
            <li><Link to="/product">Oil on Canvas</Link></li>
            <li><Link to="/product">Abstract Expressionism</Link></li>
            <li><Link to="/product">Modern Landscapes</Link></li>
            <li><Link to="/product">Figurative & Portraits</Link></li>
            <li><Link to="/product">Japanese Watercolors</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Art Advisory</h4>
          <ul className="footer-links">
            <li><a href="#gallery-section">Curator Consultations</a></li>
            <li><a href="#gallery-section">Certificate of Provenance</a></li>
            <li><a href="#gallery-section">Museum-Grade Framing</a></li>
            <li><a href="#gallery-section">Insured Crating & Transit</a></li>
            <li><a href="#gallery-section">Collector Viewing Period</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Collector Care</h4>
          <ul className="footer-links">
            <li><Link to="/cart">My Acquisition Cart</Link></li>
            <li><Link to="/wishlists">Saved Artworks</Link></li>
            <li><Link to="/login">Collector Account</Link></li>
            <li><a href="mailto:curator@canvasora.art">curator@canvasora.art</a></li>
            <li><a href="#support">Shipping & Returns FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p className="copyright-text">
          © 2026 CANVASORA ART INTERNATIONAL. All Rights Reserved. Handcrafted with reverence for fine arts.
        </p>
        <div className="footer-legal-links">
          <span>Authenticity Guaranteed</span>
          <span>•</span>
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Acquisition</span>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);

