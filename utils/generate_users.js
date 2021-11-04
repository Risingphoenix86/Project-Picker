const { faker } = require("faker");

app.get("/api/fakeuser", (req, res) => {
  let fakeUser = {
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  console.log(fakeUser);

  let fakeProject = {
    title: faker.name.title(),
    content: faker.lorem.sentences(),
  };

  console.log(fakeProject);
});
