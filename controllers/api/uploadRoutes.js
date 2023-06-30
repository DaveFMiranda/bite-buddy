

const router = require('express').Router();
const withAuth = require('../../utils/auth');

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
 // insert here accessKeyId: 
  // insert here secretAccessKey:
  region: 'us-east-2'


}



);




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



// Define the route for file upload
router.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file using req.file
  // Generate the link to the uploaded file
  const fileLink = req.file.location;

  // Send the link as a response
  res.send(`<a href="${fileLink}">${fileLink}</a>`);
});


  
  
//   try {





//     const newComment = await Comment.create({
//       ...req.body,
//       bite_id: req.body.biteId,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newComment);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


module.exports = router;
