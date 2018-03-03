import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

let accountSchema = new Schema({
  email: String,
  password: String
});

accountSchema.plugin(passportLocalMongoose);

let Account = mongoose.model('Account', accountSchema);
module.exports = Account;