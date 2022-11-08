const route = require("express").Router();
const {login, register, userPage} = require("../controllers/userC");
const routeProtector = require("../middlewares/authMiddleware");


route.post("/", register);
route.post("/login", login);
route.get("/home", routeProtector, userPage);

module.exports = route;