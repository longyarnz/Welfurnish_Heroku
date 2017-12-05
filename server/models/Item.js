import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';

const itemSchema = new Schema({
	keyID: { type: Number, required: true },
  _id: { type: String, default: UUID.v4, alias: 'realID' },
  title: { type: String, required: true },
  sub: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  src_file: { type: String, required: true },
  purchased: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Item = Mongoose.model('Item', itemSchema);

Item.get = function(options = {}, limit = 1000, sort = '', callback, populate = '', project = ''){
  connect();
	return Item.find(options, project, { limit, sort, populate }, callback);
}

Item.set = function(items, callback){
  connect();
  return Item.create(items, callback);
}

Item.reset = function(options, items, callback){
  connect();
  return Item.update(options, items, callback);
}

Item.erase = function(doc, callback){
  connect();
  return Item.remove(doc, callback);
}

Item.query = `query GetItems {
  items {
    keyID
    realID
    title
    sub
    category
    price
    description
    src_file
    purchased
  }
}`;

Item.disconnect = () => Mongoose.disconnect(()=>{console.log('Database Disconnected...')});

Item.migrate = function({ keyID, _id, title, sub, category, price, description, src_file, purchased }){
	this.create({ keyID, _id, title, sub, category, price, description, src_file, purchased });
}

export default Item;