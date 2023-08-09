const { matchedData, body } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { userModel } = require("../models");

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req
 * @param {*} res
 */
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await userModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      //token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.status(201);
    res.send({ data });
  } catch (e) {
    //console.log(e)
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

/**
 * Este controlador es el encargado de logear a una persona
 * @param {*} req
 * @param {*} res
 */
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await userModel.findOne({ email: req.email });

    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    const hashPassword = user.get("password");
    //console.log(hashPassword);
    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
  try {
    const user = req.user;
    const data = await userModel.find({}).sort({ _id: -1 });
    //const data = await userModel.findAllData({});
    res.send({ data, user });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const data = await userModel.findById({ _id: id });
    res.send({ data, user });
    console.log("eldecontroller:",user);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_USER");
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.body);
    //const { body } = matchedData(req);
    //const body = re
    const id = req.params.id;
    const data = await userModel.updateOne({ _id: id }, { $set: req.body });
    //
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteUser = async (req, res) => {
  try {
    //req = matchedData(req);
    const id = req.params.id;
    const deleteResponse = await userModel.delete({ _id: id });
    const data = {
      deleted: deleteResponse.matchedCount,
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  registerCtrl,
  loginCtrl,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
