const mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
  res.status(status).json(content);
};

var theEarth = (function() {
  var earthRadius = 6371; // km, miles is 3959
  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * earthRadius);
  };
  var getRadsFromDistance = function(distance) {
    return parseFloat(distance / earthRadius);
  };
  return {
    getDistanceFromRads : getDistanceFromRads,
    getRadsFromDistance : getRadsFromDistance
  };
})();

module.exports = {
  locationsCreate: function(req, res) {
    var data = {
      "name" : req.body.name,
      "address" : req.body.address,
      "facilities" : req.body.facilities.split(', '),
      "coords" : [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat)
      ],
      "openingTimes" : [{
          "days" : req.body.day1,
          "opening" : req.body.opening1,
          "closing" : req.body.closing1,
          "closed" : req.body.closed1
        },{
          "days" : req.body.day2,
          "opening" : req.body.opening2,
          "closing" : req.body.closing2,
          "closed" : req.body.closed2
        },{
          "days" : req.body.day3,
          "opening" : req.body.opening3,
          "closing" : req.body.closing3,
          "closed" : req.body.closed3
        }
      ]
    };
    Loc.create(data, function(err, location) {
      if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }
      sendJsonResponse(res, 200, location);
    });
  },
  locationsListByDistance: function(req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    if (!lng || !lat) {
      sendJsonResponse(res, 404, {
        "message": "lng and lat query parameters are required"
      });
      return;
    }
    var point = {
      typy: 'Point',
      coordinates: [lng, lat]
    };
    var options = {
      spherical: true,
      maxDistance: theEarth.getRadsFromDistance(20),
      num: 10
    };
    Loc.geoNear(point, options, function(err, results, stats) {
      var locations = [];
      if (results && results.length) {
        results.forEach(function(doc) {
          locations.push({
            distance: theEarth.getDistanceFromRads(doc.dis),
            name: doc.obj.name,
            address: doc.obj.address,
            rating: doc.obj.rating,
            facilities: doc.obj.facilities,
            _id: doc.obj._id
          });
        });
      }
      sendJsonResponse(res, 200, locations);
    });
  },
  locationsReadOne: function(req, res) {
    if (req.params && req.params.locationId) {
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
        sendJsonResponse(res, 200, location);
      });
    } else {
      sendJsonResponse(res, 404, {message: 'No locationId in request'});
    }
  },
  locationsUpdateOne: function(req, res) {
    if (req.params && req.params.locationId) {
      Loc.findById(req.params.locationId)
        .select('-reviews -rating')
        .exec(function(err, location) {
          location.name = req.body.name;
          location.address = req.body.address;
          location.facilities = req.body.facilities.split(', ');
          location.coords = [
            parseFloat(req.body.lng),
            parseFloat(req.body.lat)
          ];
          location.openingTimes = [{
              "days" : req.body.day1,
              "opening" : req.body.opening1,
              "closing" : req.body.closing1,
              "closed" : req.body.closed1
            },{
              "days" : req.body.day2,
              "opening" : req.body.opening2,
              "closing" : req.body.closing2,
              "closed" : req.body.closed2
            },{
              "days" : req.body.day3,
              "opening" : req.body.opening3,
              "closing" : req.body.closing3,
              "closed" : req.body.closed3
            }
          ];
          location.save(function(err, loc) {
            if (err) {
              sendJsonResponse(res, 404, err);
            } else {
              sendJsonResponse(res, 200, loc);
            }
          });
        });
    } else {
      sendJsonResponse(res, 404, {message: 'No locationId in request'})
    }
  },
  locationsDeleteOne: function(req, res) {
    if (req.params && req.params.locationId) {
      Loc.findByIdAndRemove(req.params.locationId)
      // .select('name reviews')
      .exec(function(err, location) {
        if (!err) {
          sendJsonResponse(res, 404, err);
        } else{
          sendJsonResponse(res, 204, null);
        }
      });
    } else {
      sendJsonResponse(res, 404, {message: 'No locationId in request'});
    }
  },
  locationsList: function(req, res) {
    Loc.find({})
      .exec(function(err, locations) {
        if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        sendJsonResponse(res, 200, locations);
      });
  }
};
