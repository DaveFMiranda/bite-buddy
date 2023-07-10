const sequelize = require('../config/connection');
const { User, Bite, Comment, Photo } = require('../models');

const userData = require('./userData.json');
const biteData = require('./biteData.json');
const commentData = require('./commentData.json');
const photoData = require('./photoData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const createdBites = [];

  for (const bite of biteData) {
    const createdBite = await Bite.create({
      ...bite,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    createdBites.push(createdBite);
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      bite_id: createdBites[Math.floor(Math.random() * createdBites.length)].id,
    });
  }

  for (const photo of photoData) {
    await Photo.create({
      ...photo,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      bite_id: createdBites[Math.floor(Math.random() * createdBites.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
