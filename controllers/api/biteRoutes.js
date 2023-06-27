const router = require('express').Router();
const { Bite, Photo } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBite = await Bite.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBite);
  } catch (err) {
    res.status(400).json(err);
  }
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
