const express = require("express");
const router = express.Router();
const multer = require("multer");
const validate = require("../../validates/admin/account.validate");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });
const controller = require("../../controllers/admin/account.controller");
router.get("/", controller.accounts);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("avatar"),
  validate.createPost,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.editPatch,
  controller.editPatch
);
module.exports = router;
