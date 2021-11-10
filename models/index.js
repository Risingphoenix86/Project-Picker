const User = require('./user');
const Project = require('./project');
const Comment = require('./comment');

User.hasMany(Project, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Project.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Project.hasMany(Comment, {
    foreignKey: 'project_id'
})

module.exports = { User, Project, Comment };