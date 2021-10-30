var faker = require('faker');

const createFakeUser = (iterations) => {
    let userName = faker.internet.userName();
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let repo = faker.internet.url();

    console.log(userName);
    console.log(firstName);
    console.log(lastName)
    console.log(email);
    console.log(repo);
};
const createFakeProject = (iterations) => {
    let projectName = faker.hacker.phrase();
    let userName = faker.internet.userName();
    let description = faker.lorem.paragraph();
    
    console.log(projectName);
    console.log(userName);
    console.log(description);
}
module.exports = createFakeUser;
module.exports = createFakeProject;