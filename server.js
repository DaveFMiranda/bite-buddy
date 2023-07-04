const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/temp',

}


));

cloudinary.config({
  cloud_name: 'dclljtiqc', 
  api_key: '678619179696898', 
  api_secret: 'zXGJHKgb2JybHEGCFCd69UyqM9Y' 
});

app.post('/upload', (req, res) => {


    console.log(req.files);

  if (!req.files || !req.files.photo) {
    return res.status(400).send('No file uploaded');
  }

const photo = req.files.photo;

cloudinary.uploader.upload(photo.tempFilePath, (error, result) => {
  if (error) {
    console.error('Error uploading file', error);
    return res.status(500).send('Error uploading file');

  }
  res.json({ url: result.secure_url });
});

});

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
    db: sequelize
  })
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
