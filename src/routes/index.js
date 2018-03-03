import express from 'express';
import config from "../config";
import middleware from '../middleware';
import initializedDb from '../db';
import restaurant from '../controller/restaurant';
import account from '../controller/account';

let router = express();

// connect to db
initializedDb(db => {

  // internal middleware
  router.use(middleware({config, db}));
  //api routes v1 
  router.use('/restaurant', restaurant({config , db}));
  router.use('/account', account({config , db}));
});

router.set('views', __dirname + '/views');
router.engine('html', require('ejs').renderFile);
router.set('view engine', 'ejs');

router.get('/', (req, res) => {
  res.render('homepage.html');
});

export default router;