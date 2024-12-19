const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../config/db');

// Utility function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Get all customers
router.get('/', (req, res) => {
  db.query('SELECT * FROM customer', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get a single customer
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM customer WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

// Create a new customer
router.post(
  '/',
  // Validation rules
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email must be valid').normalizeEmail(),
  body('phone').isLength({ min: 11, max: 11 }).withMessage('Phone number must be 11 digits').isNumeric().withMessage('Phone number must be numeric'),
  
  // Handle validation errors
  handleValidationErrors,
  
  // Controller
  (req, res) => {
    const { name, email, phone } = req.body;
    db.query(
      'INSERT INTO customer (name, email, phone) VALUES (?, ?, ?)', 
      [name, email, phone],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ id: results.insertId, name, email, phone });
      }
    );
  }
);

// Update a customer
router.put(
  '/:id',
  // Validation rules for PUT
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().notEmpty().withMessage('Email must be valid').normalizeEmail(),
  body('phone').optional().notEmpty({ min: 11, max: 11 }).withMessage('Phone number must be 11 digits').isNumeric().withMessage('Phone number must be numeric'),
  
  // Handle validation errors
  handleValidationErrors,
  
  // Controller
  (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const currentDate = new Date();
    db.query(
      'UPDATE customer SET name = ?, email = ?, phone = ?, editedAt = ? WHERE id = ?', 
      [name, email, phone, currentDate, id],
      (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ id, name, email, phone });
      }
    );
  }
);

// Delete a customer
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM customer WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Customer deleted successfully' });
  });
});

module.exports = router;
