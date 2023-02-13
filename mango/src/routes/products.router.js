import { Router } from "express";
import { uploader } from "../dirname.js";
import ProductManager from "../ProductManager.js";

const pm = new ProductManager();
const router = Router();
let counter = 1;

let products = await pm.getProducts();

router.get("/", async (req, res) => {
  res.send(products);
});
router.get("/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  let filterProd = await pm.getProductById(productId);
  if (filterProd) {
    res.send({ status: "success", message: filterProd });
  } else {
    res.send({ status: "error", message: "Invalid product id" });
  }
});
router.post("/add", uploader.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(404)
      .send({ status: "error", message: "Please enter a file" });
  }
  let newProd = req.body;
  newProd.id = counter++;
  newProd.thumbnail = req.file.path;
  products.push(newProd);
  res.send({ status: "success", message: `pet added` });
});

router.put("/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  const newData = JSON.stringify(req.body);
  await pm.updateProduct(productId, JSON.parse(newData));
  res.send({
    status: "success",
    message: `producto con id: ${productId} actualizado`,
  });
});
router.delete("/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  await pm.deleteProduct(productId);
  res.send({ status: "success", message: "objeto eliminado" });
});
export default router;
