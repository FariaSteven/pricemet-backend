const { Product: ProductModel } = require("../models/Product");

const productController = {
  create: async (req, res) => {
    try {
      const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const response = await ProductModel.create(product);

      res.status(201).json({ response, message: "Produto criado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const products = await ProductModel.find();

      res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await ProductModel.findById(id);

      if (!product) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await ProductModel.findByIdAndDelete(id);
      if (!product) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }
      res.status(200).json(product, "Produto excluído com sucesso");
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };
      const updateProduct = await ProductModel.findByIdAndUpdate(id, product);
      if (!updateProduct) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }

      res
        .status(200)
        .json({ product, message: "Produto atualizado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
