/**
 * Created by khaled on 5/28/2016.
 */
var DeviceRelations = require('../models/deviceRelationsModel');
var Device = require('../models/deviceModel');
var _ = require('underscore');
var date = require('../Utilities/date.js');

exports.createRelations = function(req, res){
  req.body = _.pick(req.body, 'IP', 'DomeIP', 'NurseID');

  Device.find({IP:req.body.IP},function(err, device){
         if(err){
           res.status(500).send(err);
         }else if(_.isEmpty(device)) {
           res.status(404).end();
         }else{
           var deviceRelations = new DeviceRelations(req.body);
           deviceRelations.createdOn = date().formatted;
           deviceRelations.save(function(err){
             if(err){
               res.status(500).send(err); // 500 means server internal error
             }else{
               res.status(201).send(deviceRelations); // status 201 means created
             }
           });
         }
   });
  //res.redirect(301,'/');
};

exports.getAllRelations = function (req, res){
  var query = _.pick(req.query, 'IP', 'DomeIP', 'NurseID');
  
   DeviceRelations.find(query, function(err, relations){
     if(err){
       res.status(500).send(err);
     }else if(_.isEmpty(relations)) {
       res.status(404).send("Not Found");
     }
     else {
       var relationsWithLink = [];

       relations.forEach(function (relation, index, array) {
         var newRelation = relation.toJSON();
         newRelation.links = {};
         newRelation.links.self = 'http://' + req.headers.host + '/api/relations/' + newRelation._id;
         relationsWithLink.push(newRelation);
       });
       res.send(relationsWithLink);
     }
   });
};

exports.findRelationByID = function(req, res, next){
  
  DeviceRelations.findById(req.params.relationID,function(err, relation){
    if(err)
    {
      res.status(500).send(err);
    }else if(_.isEmpty(relation)){
      res.status(404).send("Not Found");
    }else{
      req.relation = relation;
      next();
    }
  });
};

exports.getRelation =  function(req, res){
  var relationWithLinks = req.relation.toJSON();
  relationWithLinks.links = {};
  relationWithLinks.links.finterByDomeLight = 'http://'+ req.headers.host + '/api/relations/?DomeIP=' + relationWithLinks.DomeIP;
  relationWithLinks.links.finterByNurseStation = 'http://'+ req.headers.host + '/api/relations/?NurseID=' + relationWithLinks.NurseID;
  res.json(relationWithLinks);
}

exports.editRelation = function(req, res){
  req.body = _.pick(req.body, 'IP', 'DomeIP','NurseID');
  req.body.updatedOn = date().formatted;

  req.relation = _.extend(req.relation, req.body);

  req.relation.save(function(err){
    if(err){
      res.status(500).send(err);
    }else{
      res.json(req.relation);
    }
  });
};

exports.deleteRelation = function(req, res){

  req.relation.remove(function(err){
    if(err){
      res.status(500).send(err);
    }else{
      res.status(204).send();
    }
  });
};