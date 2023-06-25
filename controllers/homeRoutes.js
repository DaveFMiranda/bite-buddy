// Make sure models, constants, and stuff you're including match the relationships you set up among the models

const router = require('express').Router();
const { Bite, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all bites and JOIN with user and comment data
    const biteData = await Bite.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
          {model: Comment,
          attributes: ['content'],
        },
      ],
    });

    // Serialize data so the template can read it
    const bites = biteData.map((bite) => bite.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      bites, 
      logged_in: req.session.logged_in 
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
          attributes: ['name'],
          
        },
        {model: Comment,
          attributes: ['content'],
        },
      ],
    });

    const bite = biteData.get({ plain: true });

    res.render('bite', {
      ...bite,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Bite, include: [Comment]  }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
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
