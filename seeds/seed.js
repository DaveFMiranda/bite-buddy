
const sequelize = require('../config/connection');
//TO DO: update constants to match the model name exports, make sure the path below is where the models are
const { User, Bite, Comment } = require('../models');

// TO DO: make sure these match the filenames in seeds/
const userData = require('./userData.json');
const biteData = require('./biteData.json');
const commentData = require('./commentData.json');


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

  process.exit(0);
};

seedDatabase();
