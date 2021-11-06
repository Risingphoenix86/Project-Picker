const faker = require("faker");
const sequelize = require("../config/connection");
const { User, Project } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  let newUsers = [];

  for (var i = 0; i < 20; i++) {
    var userObj = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    newUsers.push(userObj);
  }
  //console.log(newUsers);
  console.log("hello");

  User.bulkCreate(newUsers, {
    individualHooks: true,
    returning: true,
  })

    .then((userRes) => {
      console.log("Bye");
      return userRes;
    })
    .then((users) => {
      let newProjects = [];
      for (var i = 0; i < 50; i++) {
        var userProject = {
          title: faker.hacker.phrase(),
          description: faker.lorem.paragraph(),
          user_id: users[Math.floor(Math.random() * users.length)].id,
        };
        newProjects.push(userProject);
      }
      console.log(newProjects);
      return Project.bulkCreate(newProjects, {
        individualHooks: true,
        returning: true,
      });
    })
    .then(() => process.exit(0))
    .catch((err) => {
      console.log(err);
    });
};

seedDatabase();
