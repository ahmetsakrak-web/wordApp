const express = require("express");
const DBConnect  = require("./config/db");
const dotenv = require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler")



const port = process.env.PORT || 8000


DBConnect()
const server = express();
server.use(express.json());
server.use(express.urlencoded({extended:false}));

server.use("/api/users", require("./routes/userR"));
server.use("/api/collections", require("./routes/collectionR"));


server.use(errorHandler);
server.listen(port, ()=>console.log("Hello World!"));

