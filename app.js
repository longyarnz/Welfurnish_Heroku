import cors from 'cors';
import path from 'path';
import multer from 'multer';
import express from 'express';
import models from './server/models';
import typeDefs from './server/schema';
import resolvers from './server/resolvers';
import graphHTTP from "express-graphql";
import { makeExecutableSchema } from 'graphql-tools';
import openBrowser from 'react-dev-utils/openBrowser';
import clearConsole from 'react-dev-utils/clearConsole';
const PORT = 4000;
const schema = makeExecutableSchema({ typeDefs, resolvers });
const App = express();
const storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, file, cb) => {
    const prefix = Date.now().toString().slice(0, 8);
    return cb(null, `${prefix}_${file.originalName}`);
  }
});
App.use(express.static('build'));
App.get('/', cors(), (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')));
App.post('/upload', multer({ storage }).any(), (req, res) => res('OK'));
App.post('/graphql', graphHTTP({
  schema, pretty: true, rootValue: models
}));
App.listen(PORT, () => {
  clearConsole();
  console.log(`Heroku Server Listening on Port ${PORT}...`);
});