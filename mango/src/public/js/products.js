import ProductManager from "../../ProductManager";
const pm = new ProductManager();
// eslint-disable-next-line no-undef
const socket = io();
const deleteButton = document.getElementById("borrar");
const idProd = document.getElementById("borrar").value;

deleteButton.addEventListener("click", pm.deleteProduct(idProd));
socket.on("products", async (data) => {
  const products = await pm.getProducts();
});
