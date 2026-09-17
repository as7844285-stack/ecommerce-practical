import { memo } from "react";
import heroBanner from "../assets/hero-banner.jpg";
import { Sparkles, ArrowRight, ShieldCheck, Award, Truck } from "lucide-react";

const Banner = () => {
  const scrollToProducts = () => {
    const section = document.getElementById("gallery-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-banner-container">
      <div className="hero-banner-card">
        <div className="hero-image-wrapper">
          <img
            src={heroBanner}
            alt="Canvasora Fine Art Exhibition Gallery"
            className="hero-banner-img"
          />
          <div className="hero-gradient-overlay" />
        </div>

        <div className="hero-banner-content">
          <div className="hero-badge">
            <Sparkles size={16} className="hero-badge-icon" />
            <span>Curated Fine Art Collection 2026</span>
          </div>

          <h1 className="hero-title">
            Curated Masterpieces. <br />
            <span className="hero-title-highlight">Timeless Expression.</span>
          </h1>

          <p className="hero-subtitle">
            Transform your sanctuary with certified original oil paintings, 
            contemporary abstracts, and museum-grade masterworks crafted by celebrated artists worldwide.
          </p>

          <div className="hero-actions">
            <button className="hero-primary-btn" onClick={scrollToProducts}>
              <span>Explore Artworks</span>
              <ArrowRight size={18} />
            </button>
            <button className="hero-secondary-btn" onClick={scrollToProducts}>
              Curator’s Picks
            </button>
          </div>

          <div className="hero-trust-bar">
            <div className="hero-trust-item">
              <ShieldCheck size={18} className="trust-icon" />
              <span>Certificate of Authenticity</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <Award size={18} className="trust-icon" />
              <span>Museum-Grade Canvases</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <Truck size={18} className="trust-icon" />
              <span>Insured Global Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Banner);

