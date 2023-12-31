const router = require('express').Router();
const { Photo } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPhoto = await Photo.create({
      ...req.body,
      bite_id: req.body.biteId,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPhoto);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const photoData = await Photo.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!photoData) {
      res.status(404).json({ message: 'No photo found with this id!' });
      return;
    }

    res.status(200).json(photoData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
