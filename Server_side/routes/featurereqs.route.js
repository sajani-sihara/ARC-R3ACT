/**
 * @file Consists of all the routes that uses express to connect
 * URLs to featurereqs.controller file.
 *
 * @author Safiyyah Thur Rahman - 2018025
 * @requires express
 */

const express = require("express");
const router = express.Router();
var featurereqController = require("../controllers/featurereqs.controller");

/**
 * Routes serving feature requests page.
 */

router.post("/:appId/keywords", featurereqController.retrieveKeywords);
router.post("/:appId/:keyword", featurereqController.relatedReviews);
router.post("/:appId/", featurereqController.featureRequests);
module.exports = router;
