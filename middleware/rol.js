const { handleHttpError } = require("../utils/handleError");
const { userModel } = require("../models");
//const { session } = require("../middleware");

/**
 * Array con los roles permitidos
 * @param {*} rol
 * @returns
 */
const checkRol = (rol) => (req, res, next) => {
  try {
    
    const { user } = req;
    

    const rolesByUser = user.role;
    
    const checkValueRol = rol.some((rolSingle) => rolesByUser.includes(rolSingle))


    
    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }

    next();
  } catch (e) {
    handleHttpError(res, "ERROR_PERMISION", 403);
  }
};

module.exports = checkRol;
