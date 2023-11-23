//defining routes
const router = require("express").Router()

const userController = require("../controllers/userController")

router.route("/users").post((req, res) =>userController.create(req, res))

router.route("/users").get((req, res) => userController.getAll(req, res))

router.route("/users/:id").get((req, res)=> userController.get(req,res))

router.route("/users/:id").delete((req, res)=> userController.delete(req,res))

router.route("/users/:id").put((req, res)=> userController.update(req,res))

router.route("/users/login").post((req, res)=> userController.login(req,res))

router.route("/users/categories/:id").get((req, res) => userController.getAllUserCategories(req, res))


module.exports = router