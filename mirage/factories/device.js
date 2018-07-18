import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  platform: faker.random.number,
  package_name: faker.company.companyName,
  app_name: faker.company.companyName,
  platform_version: faker.random.number,
  serial_number: faker.random.number,
  is_connected: faker.random.boolean,
  is_available: faker.random.boolean,
  is_tablet: faker.random.boolean
});
