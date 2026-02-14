exports.getAllProducts = async (req, res) => {
  const products = await productModel.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.json(product);
};
