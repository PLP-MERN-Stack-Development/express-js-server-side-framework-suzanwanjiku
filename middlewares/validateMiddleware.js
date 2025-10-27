const validateProduct = (req, res, next) => {
  const { id, name, price } = req.body;
  if (!id || !name || !price) {
    return res.status(400).json({ message: 'All fields (id, name, price) are required.' });
  }
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ message: 'Price must be a positive number.' });
  }
  next();
};

module.exports = validateProduct;
