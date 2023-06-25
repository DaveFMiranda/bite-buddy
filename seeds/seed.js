
const sequelize = require('../config/connection');
//TO DO: update constants to match the model name exports, make sure the path below is where the models are
const { User, Bite } = require('../models');

// TO DO: make sure these match the filenames in seeds/
const userData = require('./userData.json');
const biteData = require('./biteData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // TO DO: change variables below as needed -- should match exports from models
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const bite of biteData) {
    await Bite.create({
      ...bite,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
