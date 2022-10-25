const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController.js")
const projectController = require("../controllers/projectController.js");

router.route("/")
  .get(projectController.getByUser)
  .post(userController.basicAuth, projectController.create);

router.route("/:id")
  .get(userController.basicAuth, projectController.getById)
  .put(userController.basicAuth, projectController.updatePut)
  .delete(userController.basicAuth, projectController.delete);

router.route("/:id/:done")
  .patch(userController.basicAuth, projectController.updatePatch);

module.exports = router;