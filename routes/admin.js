const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const csrf = require("../middlewares/csrf");
const imageUpload = require("../helpers/image-upload");
const adminController = require("../controllers/admin");

router.get(
  "/blog/delete/:blogid",
  isAuth,
  csrf,
  adminController.get_blog_delete
);
router.post("/blog/delete/:blogid", isAuth, adminController.post_blog_delete);

router.get(
  "/category/delete/:categoryid",
  csrf,
  isAuth,
  adminController.get_category_delete
);
router.post(
  "/category/delete/:categoryid",
  isAuth,
  adminController.post_category_delete
);

router.get("/blog/create", isAuth, csrf, adminController.get_blog_create);
router.post(
  "/blog/create",
  imageUpload.upload.single("resim"),
  isAuth,
  adminController.post_blog_create
);

router.post("/categories/remove", isAuth, adminController.get_category_remove);

router.get(
  "/category/create",
  csrf,
  isAuth,
  adminController.get_category_create
);
router.post("/category/create", isAuth, adminController.post_category_create);

router.get("/blogs/:blogid", isAuth, csrf, adminController.get_blog_edit);
router.post(
  "/blogs/:blogid",
  imageUpload.upload.single("resim"),
  isAuth,
  adminController.post_blog_edit
);

router.get(
  "/categories/:categoryid",
  isAuth,
  csrf,
  adminController.get_category_edit
);
router.post(
  "/categories/:categoryid",
  isAuth,
  adminController.post_category_edit
);

router.get("/blogs", isAuth, adminController.get_blogs);
router.get("/categories", isAuth, adminController.get_categories);

router.get("/roles", isAuth, adminController.get_roles);
router.get("/roles/:roleid", isAuth, csrf, adminController.get_role_edit);
router.post("/roles/remove", isAuth, csrf, adminController.roles_remove);
router.post("/roles/:roleid", isAuth, csrf, adminController.post_role_edit);

router.get("/users", isAuth, adminController.get_users);
router.get("/users/:userid", isAuth, csrf, adminController.get_user_edit);
router.post("/users/:userid", isAuth, csrf, adminController.post_user_edit);

module.exports = router;
