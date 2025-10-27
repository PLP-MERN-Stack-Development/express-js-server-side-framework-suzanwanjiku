const products = require('../data/products');

// Get all products (with search, filter, pagination)
const getAllProducts = (req, res) => {
  let { minPrice, maxPrice, search, page, limit } = req.query;

  minPrice = parseFloat(minPrice) || 0;
  maxPrice = parseFloat(maxPrice) || Infinity;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  let filtered = products.filter(
    (p) => p.price >= minPrice && p.price <= maxPrice
  );

  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  res.status(200).json({
    total: filtered.length,
    page,
    limit,
    data: paginated,
  });
};

// Get product by ID
const getProductById = (req, res, next) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (!product) return next({ status: 404, message: 'Product not found' });
  res.status(200).json(product);
};

// Create product
const createProduct = (req, res) => {
  const { id, name, price } = req.body;
  const exists = products.some((p) => p.id === id);
  if (exists) return res.status(400).json({ message: 'Product ID already exists' });

  products.push({ id, name, price });
  res.status(201).json({ message: 'Product added successfully', data: products });
};

// Update product
const updateProduct = (req, res, next) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) return next({ status: 404, message: 'Product not found' });

  const { name, price, id } = req.body;
  product.name = name;
  product.price = price;
  product.id = id;

  res.status(200).json({ message: 'Product updated successfully', data: product });
};

// Delete product
const deleteProduct = (req, res, next) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) return next({ status: 404, message: 'Product not found' });

  products.splice(index, 1);
  res.status(200).json({ message: 'Product deleted successfully' });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
