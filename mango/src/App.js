import { productManager } from "./ProductManager.js";
import express from "express";
const SERVER_PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products/query", async (req, res) => {
  const productos = await JSON.stringify(productManager.getProducts());
  let limit = parseInt(req.query.limit);
  if (limit) {
    function limitarObjetos(array, limit) {
      return array.slice(0, limit);
    }
    res.send(limitarObjetos(productos, limit));
  }
  res.send(productos);
});

app.get("/products/:codeId", async (req, res) => {
  const producto = await productManager.getProductById(req.params.codeId);
  if (producto) {
    res.send(producto);
  }
  res.send({ message: "Producto no encontrado." });
});

app.listen(SERVER_PORT, () => {
  console.log(`server ${SERVER_PORT}`);
});
