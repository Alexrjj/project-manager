const express = require('express');
const router = express.Router();
const projectController = require("../controllers/projectController.js");

/* GET home page. */
router.route("/")
  .get(projectController.getByUser)
  .post(projectController.create);

router.route("/:id")
  .get(projectController.getById)
  .put(projectController.updatePut)
  .delete(projectController.delete);

router.route("/:id/:done")
  .patch(projectController.updatePatch);

module.exports = router;