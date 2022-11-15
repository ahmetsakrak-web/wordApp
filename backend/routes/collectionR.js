const route = require("express").Router();
const {
    getCollections,
    getCollection,
    postCollectionArray,
    postCollectionName,
    removeCollection,
    updateCollectionName,
    updateCollectionArray,
    removeCollectionArray,
    putColor,
} = require("../controllers/collectionC");
const routeProtector = require("../middlewares/authMiddleware");


route.route("/")
    .get(routeProtector, getCollections)
    .post(routeProtector, postCollectionName)

route.route("/:id")
    .put(routeProtector, postCollectionArray)
    .delete(routeProtector, removeCollection)
    .patch(routeProtector, updateCollectionName)
    .get(routeProtector, getCollection);

route.route("/:id/:word_id")
    .patch(routeProtector, updateCollectionArray)
    .delete(routeProtector, removeCollectionArray);

route.route("/color/:id").put(routeProtector,putColor)


    
module.exports = route;