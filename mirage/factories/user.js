import { Factory, faker } from 'ember-cli-mirage';
import ENUMS from 'hudson/enums';

export default Factory.extend({
  id (i) {
    return i+1;
  },
  uuid: faker.random.number,
  email: faker.internet.email,
  password: faker.internet.password,
  username: faker.name.firstName,
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  namespaces: faker.internet.domainName,
  projectCount: faker.random.number,
  dateJoined: faker.date.past,
  isActive: faker.random.boolean,
  anyNamespace: faker.random.boolean,

  role(){
    return faker.random.arrayElement(ENUMS.USER_ROLE.VALUES);
  },
  department(){
    return faker.random.arrayElement(ENUMS.USER_DEPARTMENT.VALUES);
  },
});
