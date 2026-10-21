import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBox, FiEdit2, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import { deleteProduct, getProducts } from "../src/api/products.js";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const loadProducts = useCallback(async (refresh = false) => {
    if (refresh) {
      setLoading(true);
      setError("");
    }
    try {
      setProducts(await getProducts());
    } catch (requestError) {
      setError(requestError.message || "Could not load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleRefresh() {
    loadProducts(true);
  }

  useEffect(() => {
    let active = true;
    getProducts()
      .then((items) => {
        if (active) setProducts(items);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Could not load products.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;

    setDeletingId(product._id);
    setError("");
    try {
      await deleteProduct(product._id);
      setProducts((current) => current.filter((item) => item._id !== product._id));
    } catch (requestError) {
      setError(requestError.message || "Could not delete this product.");
    } finally {
      setDeletingId("");
    }
  }

  return (
    <main className="page-content">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> YOUR CATALOG, IN ONE PLACE</p>
          <h1>Good things.<br /><span>Well organized.</span></h1>
          <p className="hero-description">
            A thoughtful home for the products you love. Add, update, and manage your catalog with ease.
          </p>
          <Link className="primary-button hero-button" to="/create">
            Add your first product <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-spark spark-one">✳</div>
          <div className="hero-spark spark-two">✦</div>
          <div className="hero-bag"><FiBox /></div>
          <div className="hero-tag">CURATED<br />WITH CARE</div>
        </div>
      </section>

      <section className="catalog-section" aria-labelledby="catalog-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2 id="catalog-heading">Your products</h2>
          </div>
          <span className="product-count">
            {loading ? "Loading…" : `${products.length} ${products.length === 1 ? "item" : "items"}`}
          </span>
        </div>

        {error && (
          <div className="notice notice-error" role="alert">
            <span>{error}</span>
            <button className="text-button" type="button" onClick={handleRefresh}>
              <FiRefreshCw aria-hidden="true" /> Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="loading-grid" aria-label="Loading products">
            {[1, 2, 3].map((item) => <div className="skeleton-card" key={item} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><FiBox aria-hidden="true" /></div>
            <h3>Your collection starts here</h3>
            <p>Add a product to see it appear in your catalog.</p>
            <Link className="primary-button" to="/create">Create a product <FiArrowUpRight /></Link>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product._id}>
                <div className="product-image-wrap">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                  />
                  <span className="product-image-label">IN THE COLLECTION</span>
                </div>
                <div className="product-info">
                  <div className="product-title-row">
                    <h3 title={product.name}>{product.name}</h3>
                    <p className="product-price">
                      {new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(Number(product.price))}
                    </p>
                  </div>
                  <div className="product-actions">
                    <Link className="edit-button" to={`/edit/${product._id}`}>
                      <FiEdit2 aria-hidden="true" /> Edit
                    </Link>
                    <button
                      className="delete-button"
                      type="button"
                      disabled={deletingId === product._id}
                      onClick={() => handleDelete(product)}
                    >
                      <FiTrash2 aria-hidden="true" />
                      {deletingId === product._id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <footer className="site-footer">Made for the things worth keeping <span>✳</span></footer>
    </main>
  );
}

export default Homepage;