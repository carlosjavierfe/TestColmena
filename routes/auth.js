const express = require("express");
const { loginCtrl, registerCtrl, getUsers, getUser, updateUser, deleteUser } = require("../controllers/auth")
const router = express.Router();
const authMiddleware = require("../middleware/session")
const { validatorRegister, validatorLogin, validatorGetId } = require("../validators/auth");
const checkRol = require("../middleware/rol");


router.post("/register", validatorRegister, registerCtrl);
//checkRol(["admin"])
//router.post("/login", authMiddleware,checkRol(["admin"]) , validatorLogin, loginCtrl);
router.post("/login",  validatorLogin, loginCtrl);

//router.get("/All", authMiddleware, checkRol(["user"]), getUsers);

router.get("/All", authMiddleware, checkRol(["admin"]), getUsers);


router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;