const lists_productRouter = require("express").Router();
const Lists_product = require("../models/lists_product");

lists_productRouter.get("/", (req, res) => {
  Lists_product.getAll()
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).send("erreur");
    });
});

lists_productRouter.get("/:id_list", (req, res) => {
  Lists_product.getProductsByList(req.params.id_list)
    .then((productList) => res.status(200).send(productList))
    .catch((error) => {
      res.status(500).send(error);
    });
});

lists_productRouter.get("/products/:id_product", (req, res) => {
  Lists_product.getListsByProduct(req.params.id_product)
    .then((productList) => res.status(200).send(productList))
    .catch((error) => {
      res.status(500).send(error);
    });
});

lists_productRouter.post("/", (req, res) => {
  Lists_product.create(req.body)
    .then((list) => res.status(201).json("ok"))
    .catch((err) => res.sendStatus(404));
});

lists_productRouter.put("/:id_list", (req, res) => {
  const id_list = req.params.id_list;
  Lists_product.update(Number(id_list), req.body).then((rep) =>
    rep ? res.status(200).json(req.body) : res.status(404)
  );
});

lists_productRouter.delete("/:id_list&:id_product", async (req, res, next) => {
  try {
    const id_list = req.params.id_list;
    const id_product = req.params.id_product;

    Lists_product.deleteListHasProducts(id_list, id_product).then((rep) =>
      res.status(200)
    );
  } catch (err) {
    next(err);
  }
});

module.exports = lists_productRouter;
