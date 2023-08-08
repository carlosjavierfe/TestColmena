const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    //console.log(req.body, res);
    console.log("paso");
    if (!req.headers.authorization) {
      handleHttpError(res, "NEED_SESSION", 401);
      return ;
    }
    console.log("paso2");
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);
    console.log("datatoken:",dataToken);
    if (!dataToken._id) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }

    const query = {
      _id: dataToken._id,
      //[propertiesKey.id]: dataToken[propertiesKey.id],
    };
    console.log(query);
    console.log(dataToken._id);

    const user = await usersModel.findById(dataToken._id);
    console.log(user);
    req = user;

   // next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;
