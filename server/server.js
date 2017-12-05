import Exp from 'express';
import GraphHTTP from 'express-graphql';
import Models from './models';
import typeDefs from './schema';
import resolvers from './resolvers';
import multer from 'multer';
import { makeExecutableSchema } from 'graphql-tools';
import ClearConsole from 'react-dev-utils/clearConsole';

const Port = 4000;
const Schema = makeExecutableSchema({ typeDefs, resolvers });
ClearConsole();
const storage = multer.diskStorage({ 
	destination: 'images/',
	filename: (req, file, cb) => {
		const prefix = Date.now().toString().slice(0, 8);
		return cb(null, `${prefix}_${file.originalname}`)
	}
});
const App = Exp();
 App.use((r, res, n)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	n();
});
App.get(Exp.static('graphiql'));
App.post('/upload', multer({ storage }).any(), (req, res) => res.send('OK'));
App.post('/graphql', GraphHTTP({
	pretty: true,
	rootValue: Models,
	graphiql: true,
	schema: Schema
}));

App.listen(Port, () => console.log(`APP is running on ${Port}`));