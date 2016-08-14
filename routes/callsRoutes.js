/**
 * Created by khaled on 5/29/2016.
 */
var express = require('express');
var callsRouter = express.Router();
var callsController = require('../controllers/callsController');

//http://localhost:3000/api/calls/
callsRouter.route('/')
    .get(function(req, res){
      return callsController.getAllcalls(req, res);
    })
    .post(function(req, res){ // this creation is for Development in production
      //beaglebone will generate the call only via socket io
      return callsController.createcalls(req, res);
    });

//Bellow code is for dev, in producion call table can not be manupulated
//http://localhost:3000/api/calls/:callsID
callsRouter.route('/:callsID')
    .all(function(req, res, next){
      return callsController.findCallByID(req, res, next);
    })
    .get(function(req, res){
      return callsController.getCall(req, res);
    })
    .put(function(req, res){
      return callsController.editCall(req, res);
    })
    .delete(function(req, res){
      return callsController.deleteCall(req, res);
    });

module.exports = callsRouter;

