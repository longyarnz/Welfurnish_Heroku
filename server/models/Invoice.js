import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';

const invoiceSchema = new Schema({
	user: { type: String, ref: 'User' },
  _id: { type: Number, required: true, alias: 'invoice_number' },
  items: { type: String, required: true },
  cost: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Invoice = Mongoose.model('Invoice', invoiceSchema);

Invoice.get = function(options = {}, limit = 20, sort = '', callback, populate = '', project = ''){
  connect();
  return Invoice.find(options, project, { limit, sort, populate }, callback);
}

Invoice.set = function(invoice, callback){
  connect();
  return Invoice.create(invoice, callback);
}

Invoice.numerate = function(doc, callback){
  connect();
  return Invoice.count(doc, callback);
}

Invoice.erase = function(doc, callback){
  connect();
  return Invoice.remove(doc, callback);
}

Invoice.query = `query GetInvoices{
  invoices{
    user
    invoice_number
    items
    cost
  }
}`;

Invoice.disconnect = () => Mongoose.disconnect(() => {console.log('Database Disconnected...')});

Invoice.migrate = function({ user, invoice_number, items, cost }){
	Invoice.create({ user, invoice_number, items, cost });
}

export default Invoice;