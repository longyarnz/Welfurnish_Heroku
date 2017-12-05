import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';

const clientSchema = new Schema({
  _id: { type: String, default: UUID.v4, alias: 'keyID' },
	_name: { type: String, required: true }, 
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  picture_file: { type: String, required: false },
  work_order: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Client = Mongoose.model('Client', clientSchema);

Client.get = function(options = {}, limit = 20, sort = '', callback, populate = '', project = ''){
  connect();
  return Client.find(options, project, { limit, sort, populate }, callback);
}

Client.set = function(client, callback){
  connect();
  return Client.create(client, callback);
}

Client.erase = function(doc, callback){
  connect();
  return Client.remove(doc, callback);
}

Client.query = `
  query GetClients{
    clients{
      _name
      email
      phone
      picture_file
      city
      work_order
    }
  }
`;

Client.disconnect = () => Mongoose.disconnect(() => { console.log('Database Disconnected...')});

Client.migrate = function(client){
	console.log(client);
	this.create({
		_name: client._name,
		email: client.email,
		phone: client.phone,
		picture_file: client.picture_file,
		city: client.city,
		work_order: client.work_order
	});
}

export default Client;