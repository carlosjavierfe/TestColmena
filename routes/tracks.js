//const { request } = require("express");
const express = require("express");
const customHeader = require("../middleware/customHeader")
//const { getItem } = require("../controllers/tracks");
const router = express.Router();
const { validatorCreateItem } = require("../validators/tracks")
const { getItems, getItem, createItem } = require("../controllers/tracks");

//TODO http://localhost/tracks GET, POST, DELETE, PUT

router.get("/", getItems);

router.post("/", validatorCreateItem, createItem);

module.exports = router;