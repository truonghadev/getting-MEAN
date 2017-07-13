const express = require('express');
var router = express.Router();
const locationsCtrl = require('../controllers/locations');
const reviewsCtrl = require('../controllers/reviews');

// locations
router.get('/', locationsCtrl.locationsList);
router.post('', locationsCtrl.locationsCreate);
router.get('/:locationId', locationsCtrl.locationsReadOne);
router.put('/:locationId', locationsCtrl.locationsUpdateOne);
router.delete('/:locationId', locationsCtrl.locationsDeleteOne);

// reviews
router.post('/:locationId/reviews', reviewsCtrl.reviewsCreate);
router.get('/:locationId/reviews/:reviewId', reviewsCtrl.reviewsReadOne);
router.put('/:locationId/reviews/:reviewId', reviewsCtrl.reviewsUpdateOne);
router.delete('/:locationId/reviews/:reviewId', reviewsCtrl.reviewsDeleteOne);


module.exports = router;
