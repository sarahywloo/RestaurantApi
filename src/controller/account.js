import mongoose from 'mongoose';
import {Router} from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { generateAccessToken, respond, authenticate } from '../middleware/authmiddleware';
import config from '../config';
import Account from '../model/account';

export default ({ config, db }) => {
  let api = Router();
  
  // ROutes
  // Register
  api.post('/register', (req, res) => {
    Account.register(new Account({ 
      username: req.body.email
    }), req.body.password, function(err, account){
      if(err){
        res.send(err);
      }
      passport.authenticate(
        'local', {
          session: false
        })(req, res, () => {
          res.status(200).send('Successfully created new account');
        });
    });
  });

  // Login
  api.post('/login', passport.authenticate(
    'local', {
      session: false,
      scope: []
    }), generateAccessToken, respond);

  // Logout
  api.get('/logout', authenticate, (req, res) => {
    req.logout();
    res.status(200).send('Successfully logged out');
  });

  api.get('/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
  });

  return api;
}