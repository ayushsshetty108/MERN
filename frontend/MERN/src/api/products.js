const PRODUCTS_URL = "/api/products";

async function request(url, options) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "The request could not be completed.");
  }

  return result;
}

export async function getProducts() {
  const result = await request(PRODUCTS_URL);
  return result.products;
}

export async function createProduct(product) {
  return request(PRODUCTS_URL, {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id, product) {
  return request(`${PRODUCTS_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id) {
  return request(`${PRODUCTS_URL}/${id}`, { method: "DELETE" });
}
