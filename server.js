const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const firebase = require('firebase/app');
const { getStorage, ref } = require('firebase/storage');
// const {getDatabase, ref, set, get} = require('firebase/database');

const firebaseConfig = {
  apiKey: 'AIzaSyCx1FyNEYWcoYMCl6pre879ZfYzOqoxW9U',
  authDomain: 'bite-buddy-7461e.firebaseapp.com',
  projectId: 'bite-buddy-7461e',
  storageBucket: 'bite-buddy-7461e.appspot.com',
  messagingSenderId: '591261066571',
  appId: '1:591261066571:web:eeb8f7e84bd70ede2074ce',
  measurementId: 'G-7PP1DLXJP9',
};

const fb = firebase.initializeApp(firebaseConfig);

// // Access the Firebase Realtime Database
// const database = getDatabase(fb);

// // Test the Firebase Realtime Database connection
// const testRef = ref(database, 'test');

// set(testRef, 'hello, firebase')
//   .then (() => {
//     return get(testRef);
//   })
//   .then((snapshot) => {
//     const value = snapshot.val();
//     console.log('value from firebase db', value);

//   })
//   .catch((error) => {
//     console.error('error connecting to firebase db', error);
//   });

const storage = getStorage(fb);
const storageRef = ref(storage);


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

app.get('/api/storageRef', (req, res) => {
  res.json({ storageRef: storageRef });
});

module.exports = { storageRef };
