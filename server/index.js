import 'dotenv/config';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import routes from './routes/main';
import passwordRoutes from './routes/password';
import secureRoutes from './routes/secure';

// setup mongo connection
const uri = process.env.MONGO_CONNECTION_URL;
const mongoConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
};
if (process.env.MONGO_USER_NAME && process.env.MONGO_PASSWORD) {
  mongoConfig.auth = { authSource: 'admin' };
  mongoConfig.user = process.env.MONGO_USER_NAME;
  mongoConfig.pass = process.env.MONGO_PASSWORD;
}
mongoose.connect(uri, mongoConfig);

mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});

mongoose.set('useFindAndModify', false);

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});

io.on('connection', (socket) => {
  // player disconnected
  socket.on('disconnect', () => {
    console.log('player disconnected to our game');
    console.log(socket.id);
  });

  socket.on('newPlayer', (obj) => {
    console.log(obj);
    console.log('new player event received');
    socket.broadcast.emit('newPlayer', socket.id, 'everyone but original socket');
    io.emit('newPlayer', socket.id, 'everyone');
  });

  // player connected to our game
  console.log('player connected to our game');
  console.log(socket.id);
});

const port = process.env.PORT || 3000;

// updating express settings
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

// require passport auth
require('./auth/auth');

app.get('/game.html', passport.authenticate('jwt', { session: false }), (request, response) => {
  response.status(200).json(request.user);
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (request, response) => {
  response.send(path.join(__dirname, '/index.html'));
});

// setup routes
app.use('/', routes);
app.use('/', passwordRoutes);
app.use('/', passport.authenticate('jwt', { session: false }), secureRoutes);

// catch all other routes
app.use((request, response) => {
  response.status(404).json({
    message: '404 - Not Found',
    status: 404,
  });
});

// handle errors
// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response.status(error.status || 500).json({
    message: error.message,
    status: 500,
  });
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo');
  server.listen(port, () => {
    console.log(`server is running on port: ${port}`);
  });
});
