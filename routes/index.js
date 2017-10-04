const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const db = require('../server/models').db;
const Hotel = require('../server/models').Hotel;
const Restaurant = require('../server/models').Restaurant;
const Activity = require('../server/models').Activity;
const Place = require('../server/models').Place;

//Loading attractions API
var allAttractions = {};

router.get('/api', function(req, res, next) {
  var databaseRetrieval = [Hotel.findAll({include: [Place]})
    .then(function(hotels) {
      allAttractions.hotels = hotels;
    }),
    Restaurant.findAll({include: [Place]})
    .then(function(restaurants) {
      allAttractions.restaurants = restaurants;
    }),
    Activity.findAll({include: [Place]})
    .then(function(activities) {
      allAttractions.activities = activities;
    })];
    
  Promise.all(databaseRetrieval)
    .then(function() {
      res.json(allAttractions);
    })
    .catch(next);
});

module.exports = router;



