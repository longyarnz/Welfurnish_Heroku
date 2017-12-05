import Mongoose from 'mongoose';
import assert from 'assert';
import promise from 'bluebird';
export default () => {
	const uriDB = `mongodb://ayolek:Longyarn1@welfurnish0-shard-00-00-kk7e0.mongodb.net:27017,welfurnish0-shard-00-01-kk7e0.mongodb.net:27017,welfurnish0-shard-00-02-kk7e0.mongodb.net:27017/welfurnish?ssl=true&replicaSet=Welfurnish0-shard-0&authSource=admin`;
	// const uriDB = 'mongodb://ayolek:tytanic@127.0.0.1/welfurnish';
	Mongoose.connect(uriDB, { useMongoClient: true }, function(err){
		assert.equal(err, null);
		console.log("Database Connected...");
	});
	Mongoose.Promise = promise;
}