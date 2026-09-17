import { memo, useState, useMemo } from "react";
import Banner from "../components/banner";
import Card from "../components/card";
import { Search, SlidersHorizontal, Sparkles, ShieldCheck, Truck, RefreshCw, Palette } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Artworks" },
  { id: "oil", label: "Oil on Canvas" },
  { id: "abstract", label: "Abstract" },
  { id: "landscape", label: "Landscape" },
  { id: "portrait", label: "Portraits" },
  { id: "watercolor", label: "Watercolor" },
];

const Home = ({ products = [], toggleWishlist, favData }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter((p) => {
        const text = `${p.name || ""} ${p.description || ""}`.toLowerCase();
        if (selectedCategory === "oil") return text.includes("oil") || !text.includes("watercolor");
        if (selectedCategory === "abstract") return text.includes("abstract") || text.includes("geometry");
        if (selectedCategory === "landscape") return text.includes("landscape") || text.includes("sunset") || text.includes("horizon") || text.includes("city");
        if (selectedCategory === "portrait") return text.includes("portrait") || text.includes("solitude") || text.includes("reverie") || text.includes("professor") || text.includes("joker") || text.includes("spider") || text.includes("virat");
        if (selectedCategory === "watercolor") return text.includes("watercolor") || text.includes("sakura");
        return true;
      });
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "name") {
      list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="home-page-container">
      <Banner />

      <section id="gallery-section" className="gallery-section">
        <div className="gallery-section-header">
          <div className="gallery-header-title-box">
            <span className="gallery-section-eyebrow">Exhibition Catalogue</span>
            <h2 className="gallery-section-heading">Featured Fine Artworks</h2>
            <p className="gallery-section-sub">
              Explore handpicked contemporary canvases and classical masterworks curated for discerning collectors.
            </p>
          </div>

          <div className="gallery-filter-toolbar">
            <div className="gallery-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by artwork name, style, or medium..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="gallery-search-input"
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="gallery-sort-box">
              <SlidersHorizontal size={16} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="gallery-sort-select"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Title: A – Z</option>
              </select>
            </div>
          </div>

          <div className="gallery-category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-pill ${selectedCategory === cat.id ? "is-active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="gallery-empty-state">
            <Palette size={48} className="empty-icon" />
            <h3>No Artworks Found</h3>
            <p>Try refining your search terms or selecting another category.</p>
            <button
              className="empty-reset-btn"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="container">
            {filteredProducts.map((elem) => (
              <Card
                key={elem._id}
                product={elem}
                toggleWishlist={toggleWishlist}
                favData={favData}
              />
            ))}
          </div>
        )}
      </section>

      {/* Trust & Guarantee Section */}
      <section className="perks-section">
        <div className="perks-grid">
          <div className="perk-card">
            <div className="perk-icon-wrap">
              <Sparkles size={24} />
            </div>
            <h4>100% Handcrafted Originals</h4>
            <p>Every piece is an authentic original, meticulously painted on archival linen canvas.</p>
          </div>

          <div className="perk-card">
            <div className="perk-icon-wrap">
              <ShieldCheck size={24} />
            </div>
            <h4>Certificate of Provenance</h4>
            <p>Each artwork arrives with signed provenance documentation and artist verification.</p>
          </div>

          <div className="perk-card">
            <div className="perk-icon-wrap">
              <Truck size={24} />
            </div>
            <h4>Insured White-Glove Delivery</h4>
            <p>Custom wooden crating and transit insurance to ensure pristine arrival worldwide.</p>
          </div>

          <div className="perk-card">
            <div className="perk-icon-wrap">
              <RefreshCw size={24} />
            </div>
            <h4>Gallery Guarantee</h4>
            <p>Enjoy a 14-day in-home viewing experience with complimentary returns if not in love.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Home);

