const router = require('express').Router();
const { Bite, Photo } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBite = await Bite.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    const imageUrls = Array.isArray(req.body.image_url)
      ? req.body.image_url
      : [req.body.image_url];

    const newPhotos = await Promise.all(
      imageUrls.map(async (imageUrl) => {
        return Photo.create({
          image_url: imageUrl,
          bite_id: newBite.id,
          user_id: req.session.user_id,
        });
      })
    );

    res.status(200).json(newBite);
  } catch (err) {
    res.status(400).json(err);
  }
});

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
