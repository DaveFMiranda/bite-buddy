const router = require('express').Router();
const { Bite, User, Comment, Photo } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const biteData = await Bite.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        { model: Comment, attributes: ['content'] },
        {
          model: Photo,
          attributes: ['image_url'],
        },
      ],
    });

    const bites = biteData.map((bite) => bite.get({ plain: true }));

    res.render('homepage', {
      bites,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bites/:id', async (req, res) => {
  try {
    const biteData = await Bite.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'date_created', 'user_id'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
        {
          model: Photo,
          attributes: ['id', 'image_url'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    });

    const bite = biteData.get({ plain: true });

    res.render('bite', {
      ...bite,
      logged_in: req.session.logged_in,
      sessionUser: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Bite, include: [Comment] }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
