//TO DO: update model name and attributes. Make sure attributes match controllers and views. Rename file.
// DAVE NOTE: the above is done. The below shows what they used to be in the original template and what they are now.
// model Project --> Bite
// attribute name --> headline
// attribute description --> content
// How to connect comments? Create comments table, each comment has a bite_id that references Bite like user_id below
// then need to join comments to bite posts

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bite extends Model {}

Bite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    headline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bite',
  }
);

module.exports = Bite;
