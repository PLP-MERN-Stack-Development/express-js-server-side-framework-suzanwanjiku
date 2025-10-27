const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authenticate = require('../middlewares/authMiddleware');
const validateProduct = require('../middlewares/validateMiddleware');

// Routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, validateProduct, createProduct);
router.put('/:id', authenticate, validateProduct, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;
