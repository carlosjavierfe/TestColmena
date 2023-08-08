const express = require("express");
const { loginCtrl, registerCtrl, getUsers, getUser, updateUser, deleteUser } = require("../controllers/auth")
const router = express.Router();
const authMiddleware = require("../middleware/session")
const { validatorRegister, validatorLogin, validatorGetId } = require("../validators/auth");
const checkRol = require("../middleware/rol");

/**
 * http://localhost:3001/api
 * 
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Register nuevo usario"
 *          description: "Esta ruta es para registrar un nuevo usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: El usuario se registra de manera correcta
 *                  '403':
 *                      description: Error por validacion
 */
router.post("/register", validatorRegister, registerCtrl);
//checkRol(["admin"])
//router.post("/login", authMiddleware,checkRol(["admin"]) , validatorLogin, loginCtrl);
router.post("/login",  validatorLogin, loginCtrl);

router.get("/All", authMiddleware, getUsers);

//router.get("/All",  getUsers);


router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;