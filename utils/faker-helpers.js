const faker = require('faker');

let fakeUser = {
    userName = faker.internet.userName(),
    randomName = faker.name.findName(),
    email = faker.internet.email(),
    repo = faker.internet.url()
};   

    console.log(fakeUser);

let fakeProject = {
    projectName = faker.hacker.phrase(),
    userName = faker.internet.userName(),
    description = faker.lorem.paragraph()
};    
    console.log(fakeProject);



module.exports = fakeUser;
module.exports = fakeProject;