/**
 * Created by khaled on 5/28/2016.
 */
var express = require('express');
var deviceRouter = express.Router();
var deviceController = require('../controllers/deviceController');

//http://localhost:3000/api/devices/
deviceRouter.route('/')
      .get(function(req, res, next){
        return deviceController.getAllDevice(req, res);
      })
      .post(function(req,res,next){
        return deviceController.create(req, res);
      });

//http://localhost:3000/api/devices/:deviceId
deviceRouter.route('/:deviceID')
    .all(function(req,res,next){
      return deviceController.findDeviceByID(req , res, next);
    })
    .get(function(req, res, next) {
      return deviceController.getDevice(req, res);
    })
    .put(function(req, res, next){
      return deviceController.editDevice(req, res);
    })
    .delete(function(req, res, next){
      return deviceController.deleteDevice(req, res);
    });

module.exports = deviceRouter;