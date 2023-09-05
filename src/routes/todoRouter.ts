var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
require("module-alias/register");
var authenticate = require("@root/auth");
var TodoController = require("@controllers/todoController");

router.use(bodyParser.json());

router
  .route("/")
  .get(authenticate.verifyUser, TodoController.getAllTodos)
  .post(authenticate.verifyUser, TodoController.addTodo);

router
  .route("/:id")
  .put(authenticate.verifyUser, TodoController.updateTodo)
  .delete(authenticate.verifyUser, TodoController.deleteTodo);

module.exports = router;
// End of File
