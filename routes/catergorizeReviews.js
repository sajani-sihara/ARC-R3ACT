
var express = require("express");
var router = express.Router();
const client = require("./mongo").client;
var db;

client.connect(err => {
    if (err) {
        console.log("Error has occured while connecting to database: ", err);
    }
    db = client.db("ARC");
    console.log("Connected to database - keywords");
    // client.close();
});
// GET
router.get("/bugfixes", (request, response) => {
    db.collection("Reviews").find({cluster:"BugFixes"}).sort({ svr_sentiment: 1 }).toArray((err, result) => {
        if (err) {
            return response.status(500).send("error");
        } else {
            response.send(result);
        }
    });
});

router.get("/bugfixkeywords", (request, response) => {
    db.collection("BugFixes").find().sort({ sentiment_score: 1 }).toArray((err, result) => {
        if (err) {
            return response.status(500).send("error");
        } else {
            bugFixes = [];
            for (let index = 0; index < result.length; index++) {
                if (result[index].keyword != "") {
                    bugFixes.push(result[index]);
                }
            }
            response.send(bugFixes);
        }
    });

});
router.get("/bugfixes/:keyword", async (request, response) => {
    db.collection("BugFixes").findOne({ keyword: request.params.keyword }, async (err, result) => {
        if (err) {
            return response.status(500).send("error");
        } else {
            bugFixes = [];
            reviewIDs = result.reviewIDs;
            for (let index = 0; index < reviewIDs.length; index++) {
                var review = await db.collection("Reviews").findOne({ _id: reviewIDs[index] });
                bugFixes.push(review);
            }
            response.send(bugFixes);

        }
    });

});

router.get("/featreqs", (request, response) => {
    db.collection("Reviews").find({cluster:"FeatureRequests"}).sort({ svr_sentiment: 1 }).toArray((err, result) => {
        if (err) {
            return response.status(500).send("error");
        } else {
            response.send(result);
        }
    });
});

router.get("/featreqkeywords", (request, response) => {
    db.collection("FeatureRequests").find().sort({ sentiment_score: 1 }).toArray((err, result) => {
        if (err) {
            return response.status(500).send("error");
        } else {
            featreqs = [];
            for (let index = 0; index < result.length; index++) {
                if (result[index].keyword != "") {
                    featreqs.push(result[index]);
                }
            }
            response.send(featreqs);
        }
    });

});
router.get("/featreqs/:keyword", async (request, response) => {
    db.collection("FeatureRequests").findOne({ keyword: request.params.keyword }, async (err, result) => {
        if (err) {
            return response.status(500).send("error");
        } else {
            featreqs = [];
            reviewIDs = result.reviewIDs;
            for (let index = 0; index < reviewIDs.length; index++) {
                var review = await db.collection("Reviews").findOne({ _id: reviewIDs[index] });
                featreqs.push(review);
            }
            response.send(featreqs);

        }
    });

});
router.get("/common", (request, response) => {
    db.collection("Reviews").find({ cluster: "Common" }).toArray((err, result) => {
        if (err) {
            return response.status(500).send("error");
        } else {
            response.send(result)
        }
    });

});

module.exports = router;