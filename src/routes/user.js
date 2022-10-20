const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController.js");

/* GET users listing. */


router.route("/")
  .get(userController.getAll)
  .post(userController.create);

router.route('/registerUser')
  .get(userController.registerUser);

router.route('/saveUser')
  .post(userController.create);

router.route('/delete')
  .post(userController.delete);
module.exports = router;

router.route("/:id")
  .get(userController.getById)
  .put(userController.update)

module.exports = router;