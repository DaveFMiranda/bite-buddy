const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

AWS.config.update({
  accessKeyId: 'AKIAVUTWBCGEWGP7SGFN',
  secretAccessKey: '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',
  region: 'us-east-2'
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'bite-buddy', 
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()); // Use a unique filename for the uploaded file
    }
  })
});

// // Here's the code for setting up multer:

// const app = express();

// // Define the route for file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//   // Access the uploaded file using req.file
//   // Generate the link to the uploaded file
//   const fileLink = req.file.location;

//   // Send the link as a response
//   res.send(`<a href="${fileLink}">${fileLink}</a>`);
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


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
