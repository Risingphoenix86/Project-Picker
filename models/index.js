//const User = require('./User.js');
const Project = require('./Project');

User.hasMany(Project, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Project.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Project };