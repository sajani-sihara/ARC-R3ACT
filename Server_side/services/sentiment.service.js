/**
 * @file Consists of all the CRUD operations needed for the sentiment.controller file.
 *
 * @author Shiromi Thevarajan - 2018117
 * @requires mongodb
 */

const client = require("../db/mongo").client;

var db;
// Check the MongoDB Database Connection
client.connect((err) => {
  if (err) {
    // If there is an error in the Connection Log out the error
    console.log("Error has occured while connecting to database: ", err);
  }
  db = client.db("ARC"); // Get the name of the Database and store it onto the db variable
  console.log("Connected to database - sentiment"); // If Successfully Connected to the database
  // client.close();
});

/**
 * Retrieves the sentiment and other related details of the app from the database.
 *
 * @param {string} query Specifies selection filter using query operators.
 * @returns {array} The arrat holding the results of the find query.
 */
exports.getSentiment = async function (query) {
  try {
    var result = await db.collection("MobileApplications").findOne(query);
    return result;
  } catch (error) {
    console.log(error + " Error occured while retrieving sentiment details.");
  }
};
