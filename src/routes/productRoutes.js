const express = require("express");
const router = express.Router();

// TEMP TEST DATA
const products = [
  {
    _id: "1",
    name: "iPhone 14 Pro",
    price: 1200000,
    description: "Apple flagship phone",
    images: ["https://via.placeholder.com/400"]
  },
  {
    _id: "2",
    name: "PS5",
    price: 950000,
    description: "Sony PlayStation 5",
    images: ["https://via.placeholder.com/400"]
  }
];

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});

module.exports = router;
