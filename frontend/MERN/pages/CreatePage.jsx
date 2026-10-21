import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowUpRight, FiImage } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createProduct, getProducts, updateProduct } from "../src/api/products.js";

function CreatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    let active = true;

    async function loadProduct() {
      setLoading(true);
      setError("");
      try {
        const products = await getProducts();
        const product = products.find((item) => item._id === id);
        if (!product) throw new Error("This product could not be found.");
        if (active) setForm({
          name: product.name,
          price: String(product.price),
          image: product.image,
        });
      } catch (requestError) {
        if (active) setError(requestError.message || "Could not load this product.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProduct();
    return () => { active = false; };
  }, [id]);

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      const product = {
        name: form.name.trim(),
        price: Number(form.price),
        image: form.image.trim(),
      };
      if (isEditing) await updateProduct(id, product);
      else await createProduct(product);
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(requestError.message || `Could not ${isEditing ? "update" : "create"} the product.`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="page-content form-page">
      <Link className="back-link" to="/"><FiArrowLeft aria-hidden="true" /> Back to collection</Link>
      <div className="form-layout">
        <section className="form-intro">
          <p className="eyebrow">{isEditing ? "MAKE IT YOURS" : "A GOOD PLACE TO START"}</p>
          <h1>{isEditing ? <>A little <span>refresh.</span></> : <>Add something<br /><span>worth keeping.</span></>}</h1>
          <p>{isEditing ? "Update the details and keep your collection just right." : "Give your product a name, a price, and an image. You can always change things later."}</p>
          <div className="form-decoration" aria-hidden="true"><span>✳</span><div /></div>
        </section>

        <section className="form-card" aria-labelledby="form-heading">
          {loading ? (
            <div className="form-loading">Loading product details…</div>
          ) : (
            <>
              <div className="form-card-heading">
                <div className="form-icon"><FiImage aria-hidden="true" /></div>
                <div>
                  <h2 id="form-heading">{isEditing ? "Edit product" : "Product details"}</h2>
                  <p>Fields marked with * are required</p>
                </div>
              </div>
              {error && <div className="notice notice-error form-notice" role="alert">{error}</div>}
              <form className="product-form" onSubmit={handleSubmit}>
                <label htmlFor="product-name">Product name <span>*</span></label>
                <input
                  id="product-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Everyday ceramic mug"
                  value={form.name}
                  onChange={handleChange}
                  maxLength={120}
                  required
                />

                <label htmlFor="product-price">Price <span>*</span></label>
                <div className="price-input">
                  <span aria-hidden="true">$</span>
                  <input
                    id="product-price"
                    name="price"
                    type="number"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>

                <label htmlFor="product-image">Image URL <span>*</span></label>
                <input
                  id="product-image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/product.jpg"
                  value={form.image}
                  onChange={handleChange}
                  required
                />
                <p className="field-hint">Paste a publicly accessible image link.</p>

                <button className="primary-button submit-button" type="submit" disabled={saving}>
                  {saving ? (isEditing ? "Saving changes…" : "Adding product…") : (isEditing ? "Save changes" : "Add product")}
                  {!saving && <FiArrowUpRight aria-hidden="true" />}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default CreatePage;