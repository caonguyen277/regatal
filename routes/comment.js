const express = require("express");
const router = express.Router();

const {
    listAllComment,
    createComment,
    deleteUserComment,
    listAllCommentByProduct,
    deleteComment,
    commentById,
    addCommentTitle,
    listAllCommentTitle,
    deleteCommentTitle
} = require("../controllers/comment");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {productById} = require("../controllers/product")
router.get("/comments/:productId", listAllCommentByProduct);
router.post("/createComment/:userId", requireSignin, isAuth, createComment);
router.post("/deleteComment/:userId", requireSignin, isAuth, deleteUserComment);
router.delete(
    "/deleteComment/:commentId/:userId",
    requireSignin,
    isAdmin,
    deleteComment
  );
router.put(
    "/addCommentTitle/:commentId/:userId",
    requireSignin,
    isAdmin,
    addCommentTitle
  );
router.delete(
    "/deleteCommentTitle/:commentId/:userId",
    requireSignin,
    isAdmin,
    deleteCommentTitle
  );
router.get("/commentTitle",listAllCommentTitle)
router.get("/comments", listAllComment);

// whenever there's a 'categoryId' in the route parameter,
// call the categoryById middleware method
router.param("commentId", commentById);
router.param("productId",productById);
router.param("userId", userById);

module.exports = router;
