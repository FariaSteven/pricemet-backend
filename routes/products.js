const router = require("express").Router();

const productController = require("../controllers/productController");

router
  .route("/products")
  .post((req, res) => productController.create(req, res));

router.route("/products").get((req, res) => productController.getAll(req, res));

router
  .route("/products/:id")
  .get((req, res) => productController.getOne(req, res));
router
  .route("/products/:id")
  .delete((req, res) => productController.delete(req, res));

router
  .route("/products/:id")
  .put((req, res) => productController.update(req, res));

module.exports = router;
