import { Router } from "express";
import { uploader } from "../dirname.js";

const router = Router();

router.get("/:cid/productos", (req, res) => {});
router.post("/", (req, res) => {});
router.post("/:cid/productos", (req, res) => {});
router.delete("/:cid", (req, res) => {});
router.delete("/:cid/productos/:pid", (req, res) => {});

export default router;
