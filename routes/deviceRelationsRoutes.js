/**
 * Created by khaled on 5/28/2016.
 */
var express = require('express');
var relationRouter = express.Router();
var deviceRelationsController = require('../controllers/deviceRelationsController');


//http://localhost:3000/api/relations/
relationRouter.route('/')
        .get(function(req, res){
          return deviceRelationsController.getAllRelations(req, res);
        })
        .post(function(req, res){
          return deviceRelationsController.createRelations(req, res);
        });

//http://localhost:3000/api/relations/:relationId
relationRouter.route('/:relationID')
    .all(function(req, res, next){
      return deviceRelationsController.findRelationByID(req, res, next);
    })
    .get(function(req, res){
      return deviceRelationsController.getRelation(req, res);
    })
    .put(function(req, res){
      return deviceRelationsController.editRelation(req, res); 
    })
    .delete(function(req, res){
      return deviceRelationsController.deleteRelation(req, res);
    });

module.exports = relationRouter;