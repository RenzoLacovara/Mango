import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const SERVER_PORT = 9090;
const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`server ${SERVER_PORT}`);
});
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log("cliente conectado");
});
