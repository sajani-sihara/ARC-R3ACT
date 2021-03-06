/**
 * @file Handles all the functions related to the
 * processing the bug fixes of the app.
 *
 * @author Safiyyah Thur Rahman - 2018025
 */

var bugfixesService = require("../services/bugfixes.service");

/**
 * Retrieves and displays keywords related to
 * bug fixes from the database.
 */
exports.retrieveKeywords = async function (request, response) {
  var detailsArray = [];
  var detailsResult = [];

  try {
    detailsResult = await bugfixesService.getDetails({
      appId: request.params.appId,
    });

    // Store all the keywords and review ids related to bug fixes
    var bugfixesArray = detailsResult.BugFixes;
    for (var i in bugfixesArray) {
      var keyword = bugfixesArray[i].keyword;
      var sentiment = bugfixesArray[i].sentiment_score;
      var sentiment_score = parseFloat(sentiment);

      // Store all the details except the empty keyword into an array
      if (keyword != "") {
        detailsArray.push([keyword, sentiment_score]);
      }
    }

    // Sorting the array in ascending order of the sentiment score
    var keywords = sortAscArray(detailsArray);
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
 * Retrieves and displays all the reviews related
 * to bug fixes from the database.
 */
exports.bugFixes = async function (request, response) {
  try {
    var detailsResult = [];
    var detailsArray = await bugfixesService.getDetails({
      appId: request.params.appId,
    });

    // Store all the reviews to a variable
    var reviewsArray = detailsArray.reviewsArray;

    // Iterating through reviewsArray
    reviewsArray.forEach((review) => {
      // Checking if the review belongs to bug fix cluster
      if (review.cluster == "BugFixes") {
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
    // Store all the keywords and review ids related to bug fixes
    var bugFixes = detailsArray.BugFixes;

    // Find and store the keyword from the array to a variable
    var bugFix = bugFixes.find((bug) => bug.keyword === request.params.keyword);

    // Checking if the variable is not null
    if (bugFix && bugFix.reviewIDs.length) {
      var reviewIDs = bugFix.reviewIDs;
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
 * Sorts the 2D array in ascending order of the second element.
 *
 * @param {array} array An unsorted array.
 * @returns {array} The array sorted in ascending order.
 */
function sortAscArray(array) {
  var swap;
  var n = array.length - 1;
  do {
    swap = false;
    for (var i = 0; i < n; i++) {
      if (array[i][1] > array[i + 1][1]) {
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
