// Make sure these match the names of the models, add relationships below as needed

const User = require('./User');
const Bite = require('./Bite');
const Comment = require('./Comment');

User.hasMany(Bite, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Bite.belongsTo(User, {
  foreignKey: 'user_id'
});

Bite.hasMany(Comment, {
  foreignKey: 'bite_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Bite, {
  foreignKey: 'bite_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Bite, Comment };
