/**
 * @file Handles all the functions related to the
 * processing the feature requests of the app.
 *
 * @author Safiyyah Thur Rahman - 2018025
 */

var bugfixesService = require("../services/bugfixes.service");

/**
 * Retrieves and displays keywords related to feature
 * requests from the database and the app title.
 */
exports.retrieveKeywords = async function (request, response) {
  var detailsArray = [];
  var detailsResult = [];

  try {
    detailsResult = await bugfixesService.getDetails({
      appId: request.params.appId,
    });

    // Store all the keywords and review ids related to feature requests
    var featreqArray = detailsResult.FeatureRequests;
    for (var i in featreqArray) {
      var keyword = featreqArray[i].keyword;
      var sentiment = featreqArray[i].sentiment_score;
      var sentiment_score = parseFloat(sentiment);

      // Store all the details except the empty keyword into an array
      if (keyword != "") {
        detailsArray.push([keyword, sentiment_score]);
      }
    }

<<<<<<< HEAD
    // Sorting the array in ascending order of the sentiment score
=======
    // Sorting the array in descending order of the sentiment score
>>>>>>> e619476119bbdd5dcc4b801ab365512aeea5d338
    var keywords = sortDescArray(detailsArray);
    return response.send({
      sent: true,
      keywords: keywords,
      appName: detailsResult.title,
    });
  } catch (error) {
    return response.status(500).send(error);
  }
};

/**
<<<<<<< HEAD
 * Retrieves and displays and displays all the 
 * feature requests.
=======
 * Retrieves and displays all the reviews related
 * to feature requests from the database.
>>>>>>> e619476119bbdd5dcc4b801ab365512aeea5d338
 */
exports.featureRequests = async function (request, response) {
  try {
    var detailsResult = [];
    var detailsArray = await bugfixesService.getDetails({
      appId: request.params.appId,
    });

    // Store all the reviews to a variable
    var reviewsArray = detailsArray.reviewsArray;
<<<<<<< HEAD
    //if the review is a feature request then store in an array
    reviewsArray.forEach(review => {
=======

    // Iterating through reviewsArray
    reviewsArray.forEach((review) => {
      // Checking if the review belongs to feature request cluster
>>>>>>> e619476119bbdd5dcc4b801ab365512aeea5d338
      if (review.cluster == "FeatureRequests") {
        detailsResult.push({
          _id: review._id,
          text: review.text,
          partialReview: review.partialReview,
          userName: review.userName,
          date: review.date,
          rating: review.rating,
          version: review.version,
        });
      }
    });

    return response.send({ sent: true, reviewsArray: detailsResult });
  } catch (error) {
    return response.status(500).send(error);
  }
};

/**
 * Retrieves and displays reviews that discusses the
 * keyword from the database.
 */
exports.relatedReviews = async function (request, response) {
  try {
    var detailsResult = [];
    var detailsArray = await bugfixesService.getDetails({
      appId: request.params.appId,
    });

    // Store all the reviews to a variable
    var reviewsArray = detailsArray.reviewsArray;
    // Store all the keywords and review ids related to feature requests
    var featreqArray = detailsArray.FeatureRequests;
<<<<<<< HEAD
    //find the keyword in the FeatureRequests array
    var featreq = featreqArray.find((fr) => fr.keyword === request.params.keyword);
    // if the keyword is present then iterate through the reviewIDs
    // array to retrieve reviews that have the same id and store in an array
=======

    // Find and store the keyword from the array to a variable
    var featreq = featreqArray.find(
      (fr) => fr.keyword === request.params.keyword
    );

    // Checking if the variable is not null
>>>>>>> e619476119bbdd5dcc4b801ab365512aeea5d338
    if (featreq && featreq.reviewIDs.length) {
      var reviewIDs = featreq.reviewIDs;
      // Iterating through reviewsID array
      reviewIDs.forEach((reviewID) => {
        var review = reviewsArray.find((rev) => reviewID === rev._id);
        detailsResult.push({
          _id: review._id,
          text: review.text,
          partialReview: review.partialReview,
          userName: review.userName,
          date: review.date,
          rating: review.rating,
          version: review.version,
        });
      });
    }

    return response.send({ sent: true, reviewsArray: detailsResult });
  } catch (error) {
    return response.status(500).send(error);
  }
};

/**
 * Sorts the 2D array in descending order of the second element.
 *
 * @param {array} array An unsorted array.
 * @returns {array} The array sorted in descending order.
 */
function sortDescArray(array) {
  var swap;
  var n = array.length - 1;
  do {
    swap = false;
    for (var i = 0; i < n; i++) {
      if (array[i][1] < array[i + 1][1]) {
        var temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swap = true;
      }
    }
    n--;
  } while (swap);
  return array;
}
