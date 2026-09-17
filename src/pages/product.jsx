import { useEffect, useState, useMemo } from "react";
import Card from "../components/card";
import { axiosInstance } from "../axios";
import { Search, Palette, Sparkles } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Collections" },
  { id: "oil", label: "Oil on Canvas" },
  { id: "abstract", label: "Abstract" },
  { id: "landscape", label: "Landscape" },
  { id: "portrait", label: "Portraits" },
  { id: "watercolor", label: "Watercolor" },
];

export default function Product({ toggleWishlist, favData }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res?.data?.data || []);
      } catch (err) {
        console.log("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "all") {
      list = list.filter((p) => {
        const text = `${p.name || ""} ${p.description || ""}`.toLowerCase();
        if (selectedCategory === "oil") return text.includes("oil") || !text.includes("watercolor");
        if (selectedCategory === "abstract") return text.includes("abstract") || text.includes("geometry");
        if (selectedCategory === "landscape") return text.includes("landscape") || text.includes("sunset") || text.includes("horizon");
        if (selectedCategory === "portrait") return text.includes("portrait") || text.includes("solitude") || text.includes("reverie") || text.includes("professor") || text.includes("joker") || text.includes("spider") || text.includes("virat");
        if (selectedCategory === "watercolor") return text.includes("watercolor") || text.includes("sakura");
        return true;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    return list;
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="product-page-container">
      <div className="product-page-header">
        <div className="product-header-content">
          <span className="gallery-section-eyebrow">
            <Sparkles size={14} style={{ display: "inline", marginRight: "4px" }} />
            The Complete Canvasora Archive
          </span>
          <h1 className="product-page-title">Original Fine Artworks</h1>
          <p className="product-page-sub">
            Browse through {products.length} authenticated original paintings across classical and contemporary genres.
          </p>
        </div>

        <div className="product-controls-row">
          <div className="gallery-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, artist, medium..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="gallery-search-input"
            />
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
      </div>

      {loading ? (
        <div className="gallery-loading">
          <div className="gallery-spinner" />
          <p>Uncrating Artworks...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="gallery-empty-state">
          <Palette size={48} className="empty-icon" />
          <h3>No Artworks Match Your Filter</h3>
          <p>Try clearing your search query or selecting another medium category.</p>
          <button
            className="empty-reset-btn"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          >
            Clear Filters
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
    </div>
  );
}

