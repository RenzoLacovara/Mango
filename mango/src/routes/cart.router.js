import { Router } from "express";
import CartManager from "../CartManager.js";
import ProductManager from "../ProductManager.js";

const pm = new ProductManager();
const cm = new CartManager();
const router = Router();

let products = await pm.getProducts();
let carts = await cm.getCarts();

router.post("/", async (req, res) => {
  const newProducts = JSON.stringify(req.body);
  let newCart = await cm.createCart(JSON.parse(newProducts));
  carts.push(newCart);
  res.send({ status: "success", message: `cart created` });
});
router.get("/:cid/productos", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  let filterCart = await cm.getCarttById(cartId);
  if (filterCart) {
    res.send({ status: "success", message: filterCart });
  } else {
    res.send({ status: "error", message: "Invalid cart id" });
  }
});
router.post("/:cid/productos/:pid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const prodId = parseInt(req.params.pid);
  let filterProd = await pm.getProductById(prodId);
  if (filterProd) {
    let filterCart = await cm.getCarttById(cartId);
    if (filterCart) {
      filterCart.products.push(filterProd);
      res.send({ status: "success", message: filterCart });
    } else {
      res.send({ status: "error", message: "Invalid cart id" });
    }
  } else {
    res.send({ status: "error", message: "Invalid product id" });
  }
});

export default router;
