const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController.js")
const projectController = require("../controllers/projectController.js");

router.route("/")
  .get(projectController.getByUser)

router.route('/registerProject')
  .get(projectController.registerProject);

router.route('/saveProject')
  .post(projectController.create);

router.route('/delete')
  .post(projectController.delete);

router.route("/:id/:done")
  .patch(userController.basicAuth, projectController.updatePatch);

router.route("/:id")
  .get(userController.basicAuth, projectController.getById)
  .put(userController.basicAuth, projectController.updatePut)
  .delete(userController.basicAuth, projectController.delete);

module.exports = router;