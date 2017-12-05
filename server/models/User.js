import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';

const userSchema = new Schema({
	_id: { type: String, default: UUID.v4, alias: 'keyID' },
  _name: { type: String, required: true }, 
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  invoice: { type: Number, ref: 'Invoice' },
  createdAt: { type: Date, default: Date.now }
});

const User = Mongoose.model('User', userSchema);

User.get = function(options = {}, limit = 20, sort = '', callback, populate = '', project = ''){
  connect();
  return User.find(options, project, { limit, sort, populate }, callback);
}

User.set = function(user, callback){
  connect();
  return User.create(user, callback);
}

User.erase = function(doc, callback){
  connect();
  return User.remove(doc, callback);
}

User.query = `query GetUsers{
  users{
    keyID
    _name
    email
    phone
    address
    city
    invoice
  }
}`;

User.disconnect = () => Mongoose.disconnect(() => {console.log('Database Disconnected...')});

User.migrate = function({ _id, _name, email, phone, address, city }){
	this.create({ _id, _name, email, phone, address, city });
}

export default User;