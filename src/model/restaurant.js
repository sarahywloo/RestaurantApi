import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let restaurantSchema = new Schema({
  name: String,
  cuisine: String,
});

let Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;