import { Router } from "express";
import CartManager from "../CartManager.js";
import ProductManager from "../ProductManager.js";

const pm = new ProductManager();
const cm = new CartManager();
const router = Router();

let carts = await cm.getCarts();

router.post("/", async (req, res) => {
  let newCart = await cm.createCart();
  carts.push(newCart);
  res.send({ status: "success", message: `cart created` });
});
router.get("/:cid/products", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  let filterCart = await cm.getCartById(cartId);
  if (filterCart) {
    res.send({ status: "success", message: filterCart });
  } else {
    res.send({ status: "error", message: "Invalid cart id" });
  }
});
router.post("/:cid/products/:pid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const prodId = parseInt(req.params.pid);
  let filterProd = await pm.getProductById(prodId);
  if (filterProd) {
    let filterCart = await cm.getCartById(cartId);
    if (filterCart) {
      let addproduct = await cm.AddToCart(cartId, filterProd);
      res.send({ status: "success", message: addproduct });
    } else {
      res.send({ status: "error", message: "Invalid cart id" });
    }
  } else {
    res.send({ status: "error", message: "Invalid product id" });
  }
});

export default router;
