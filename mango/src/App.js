import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.get("/saludo", (req, res) => {
  let user = [{ name: "renzo" }, { name: "nicolas" }, { name: "lacovara" }];
  let index = ~~(Math.random() * user.length);
  res.render("hello", user[index]);
});
const SERVER_PORT = 9090;
app.listen(SERVER_PORT, () => {
  console.log(`server ${SERVER_PORT}`);
  console.log(__dirname);
});
