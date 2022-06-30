const express = require("express");
const router = express.Router();

const {
  createBranch,
  branchById,
  readBranch,
  updateBranch,
  removeBranch,
  listAllBranches,
} = require("../controllers/branch");
const { requireSignin, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { productById } = require("../controllers/product");
const { addFavouriteProduct, subFavouriteProduct, listAllFavourite } = require("../controllers/favourite");

router.get("/favourites/:userId",listAllFavourite);
router.post("/addFavourite/:productId/:userId", addFavouriteProduct);
router.post("/subFavourite/:productId/:userId", subFavouriteProduct);
// router.post("/createBranch/:userId", requireSignin, isAdmin, createBranch);
// router.put(
//   "/updateBranch/:branchId/:userId",
//   requireSignin,
//   isAdmin,
//   updateBranch
// );
// router.delete(
//   "/deleteBranch/:branchId/:userId",
//   requireSignin,
//   isAdmin,
//   removeBranch
// );

router.param("productId", productById);
router.param("userId", userById);

module.exports = router;
