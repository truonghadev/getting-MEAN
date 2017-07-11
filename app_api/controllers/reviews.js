const mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
  res.status(status).json(content);
};

var addReview = function(req, res, location) {
  if (!location) {
    sendJsonResponse(res, 404, {message: 'Location not found'});
    return;
  }
  location.reviews.push({
    author: req.body.author,
    rating: parseInt(req.body.rating),
    reviewText: req.body.reviewText
  });
  location.save(function(err, loc) {
    var thisLoc;
    if (err) {
      sendJsonResponse(res, 400, err);
      return;
    }
    updateAverageRating(location._id);
    thisLoc = location.reviews[location.reviews.length - 1];
    sendJsonResponse(res, 200, thisLoc);
  });
};

var updateAverageRating = function(locationId) {
  Loc.findById(locationId)
    .select('name reviews')
    .exec(function(err, location) {
      var ratingTotal = 0;
      location.reviews.forEach(function(doc) {
        ratingTotal += doc.rating;
      });
      var averageRating = parseInt(ratingTotal / location.reviews.length, 10);
      location.rating = averageRating;
      location.save(function(err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log({message: 'Location rating updated'});
      })
    });
}

module.exports = {
  reviewsCreate: function(req, res) {
    if (req.params && req.params.locationId) {
      Loc.findById(req.params.locationId)
        .select('reviews')
        .exec(function(err, location) {
          if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }
          addReview(req, res, location);
        });
    }
  },
  reviewsReadOne: function(req, res) {
    if (req.params && req.params.locationId && req.params.reviewId) {
      Loc.findById(req.params.locationId)
        // .select('name reviews')
        .exec(function(err, location) {
        if (!location) {
          sendJsonResponse(res, 404, {message: 'Location not found'});
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        if (location.reviews && location.reviews.length) {
          var review = location.reviews.id(req.params.reviewId);
          if (!review) {
            sendJsonResponse(res, 404, {message: 'Review not found'});
          } else {
            var response = {
              location: {
                id: req.params.locationId,
                name: location.name
              },
              review: review
            };
            sendJsonResponse(res, 200, response);
          }
        } else {
          sendJsonResponse(res, 404, {message: 'No reviews found'});
        }
      });
    } else {
      sendJsonResponse(res, 404, {message: 'Not found, locationid and reviewid are both required'});
    }
  },
  reviewsUpdateOne: function(req, res) {
    if (req.params && req.params.locationId && req.params.reviewId) {
      Loc.findById(req.params.locationId)
        .select('name reviews')
        .exec(function(err, location) {
          if (location.reviews.length) {
            var review = location.reviews.id(req.params.reviewid);
            if (review) {
              review.rating = req.body.rating;
              location.save(function(error, loc) {
                if (error) {
                  sendJsonResponse(res, 404, err);
                  return;
                }
                updateAverageRating(location._id);
                sendJsonResponse(res, 200, review);
              });
            }
          }
        });
    } else {
      sendJsonResponse(res, 404, {message: 'Not found, locationid and reviewid are both required'});
    }
  },
  reviewsDeleteOne: function(req, res) {
    if (req.params && req.params.locationId && req.params.reviewId) {
      Loc.findById(req.params.locationId)
        .select('name reviews')
        .exec(function(err, location) {
          if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          var review = location.reviews.id(req.params.reviewId);
          if (review) {
            review.remove();
            location.save(function(err, loc) {
              updateAverageRating(req.params.locationId);
              sendJsonResponse(res, 200, {message: 'Delete success'})
            });
          }
        })
    } else {
      sendJsonResponse(res, 404, {message: 'Not found, locationid and reviewid are both required'});
    }
  }
};
