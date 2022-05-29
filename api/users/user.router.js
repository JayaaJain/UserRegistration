const { createUser, getUserById, getUsers, deleteUser, updateUser, login } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation");

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/:id",checkToken, getUserById);
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);

module.exports = router;