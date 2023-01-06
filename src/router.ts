import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  getOneProduct,
  getProducts,
  createProduct,
  deleteProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/*
Product
*/
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/*
Update
*/
router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("version").optional(),
  body("status").isIn(["IN_PROGRESS", "DEPRECATED", "SHIPPED"]).optional(),
  handleInputErrors,
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  handleInputErrors,
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/*
Update point
*/
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional(),
  body("description").optional(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  handleInputErrors,
  (req, res) => {}
);
router.delete("/updatepoint/:id", () => {});

router.use((err, req, res, next) => {
  if(err.type === 'auth') {
      res.status(401).json({message: 'unauthorized'})
  }else if(err.type === 'input') {
      res.status(400).json({message: 'invalid input'})
  } else {
      res.status(500).json({message: 'internal server error'})
  }
})

export default router;
