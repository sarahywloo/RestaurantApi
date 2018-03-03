import mongoose from 'mongoose';
import {Router} from 'express';
import Restaurant from '../model/restaurant';

import { authenticate } from '../middleware/authmiddleware';

export default ({ config, db }) => {
  let api = Router();

  // Creating a restaurant document
  api.post('/add', authenticate, (req, res) => {
    let  newRest = new Restaurant();
    newRest.name = req.body.name;
    newRest.cuisine = req.body.cuisine;

    newRest.save(err => {
      if(err) {
        res.send.error;
      }
      res.json({ message: 'Restaurant saved successfully' });
    });
  });

  // Getting a list of all restaurants
  api.get('/', (req, res) => {
    Restaurant.find({}, (err, restaurants) => {
      if(err){
        res.send(err);
      }
      res.json(restaurants);
    });
  });

  // Getting a specific restaurant by id
  api.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if(err) {
        res.send(err);
      }
      res.json(restaurant);
    });
  });

  // Getting restaurants by cuisine type
  // TODO: FIX THIS
  api.get('/cuisine/:cuisine', (req, res) => {
    Restaurant.findOne(req.params.cuisine, (err, restaurants) => {
      if(err) {
        res.send(err);
      }
      res.json(restaurants);
    });
  });

  // Updating an existing restaurant document
  api.put('/:id', authenticate, (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if(err) {
        res.send(err);
      }
      restaurant.name = req.body.name;
      restaurant.cuisine = req.body.cuisine;
      
      restaurant.save(err => {
        if(err){
          res.send(err);
        }
        res.json({ message: "Restaurant document updated" });
      });
    });
  });

  // Delete restaurant document
  api.delete('/:id', authenticate, (req, res) => {
    Restaurant.remove({
      _id: req.params.id
    }, (err, restaurant) => {
      if(err){
        res.send(err);
      }
      res.json({ message: "Restaurant succcessfully removed" });
    });
  });

  return api;
}

