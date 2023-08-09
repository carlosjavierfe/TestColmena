const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    //console.log("paso1");
    if (!req.headers.authorization) {
      handleHttpError(res, "NEED_SESSION", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }

    const user = await userModel.findById(dataToken._id);
    
    req.user = user;
    
    //const query = {
    // _id: user._id,
    //[propertiesKey.id]: dataToken[propertiesKey.id],
    //};

    //const user = await usersModel.findOne(query);
    //req.user = user;

    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;
