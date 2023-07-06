const router = require('express').Router();
const { Bite, Photo } = require('../../models');
const withAuth = require('../../utils/auth');


// HERE'S SOME CODE TO ONLY TRIGGER NEW BITE CREATION IF THE REQUEST BODY DOESN'T HAVE A BITE_ID:

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const imageUrl = req.body.image_url;
//     const biteId = req.body.bite_id;
//     const userId = req.session.user_id;

//     let newBite;
//     if (biteId) {
//       // Use existing Bite ID
//       newBite = await Bite.findByPk(biteId);
//     } else {
//       // Create a new Bite
//       newBite = await Bite.create({
//         ...req.body,
//         user_id: userId,
//       });
//     }

//     // Create a new Photo
//     const newPhoto = await Photo.create({
//       image_url: imageUrl,
//       bite_id: newBite.id,
//       user_id: userId,
//     });

//     res.status(200).json({ newBite, newPhoto });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


router.post('/', withAuth, async (req, res) => {
  try {
    const newBite = await Bite.create({
      ...req.body,
      user_id: req.session.user_id,
    });

const imageUrls = Array.isArray(req.body.image_url) ? req.body.image_url : [req.body.image_url];

const newPhotos = await Promise.all(imageUrls.map(async (imageUrl) => {
  return Photo.create({
    image_url: imageUrl,
    bite_id: newBite ? newBite.id : req.body.bite_id,
    user_id: req.session.user_id,
  });
}));


// OLD CODE BELOW FOR HANDLING A SINGLE URL
    // const newPhoto = await Photo.create({
    //   ...req.body,
    //   bite_id: newBite.id,
    //   user_id: req.session.user_id,
    // });

    res.status(200).json(newBite);
  } catch (err) {
    res.status(400).json(err);

//   }
//   try {
//     const newPhoto = await Photo.create({
//     ...req.body,
//     bite_id: req.body.biteId,
//     user_id: req.session.user_id,
//     }); 

//     res.status(200).json(newPhoto);
// } catch (err) {
//     res.status(400).json(err);
// }
  }});

// add logic here for photo upload

router.post('/:id', withAuth, async (req, res) => {
  try {
    const updateBite = await Bite.update(
      {
        ...req.body,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    res.status(200).json(updateBite);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const biteData = await Bite.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!biteData) {
      res.status(404).json({ message: 'No bite found with this id!' });
      return;
    }

    res.status(200).json(biteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
