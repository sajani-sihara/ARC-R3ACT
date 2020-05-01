/**
 * @file Consists of all the routes that uses express to connect
 * URLs to bugfixes.controller file.
 *
 * @author Safiyyah Thur Rahman - 2018025
 * @requires express
 */

const express = require("express");
const router = express.Router();
var bugfixesController = require("../controllers/bugfixes.controller");

/**
 * Routes serving bug fixes page.
 */

router.post("/:appId/keywords", bugfixesController.retrieveKeywords);
router.post("/:appId/:keyword", bugfixesController.relatedReviews);
router.post("/:appId/", bugfixesController.bugFixes);
module.exports = router;
