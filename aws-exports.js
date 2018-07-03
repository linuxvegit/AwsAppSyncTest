"use strick"
Object.defineProperty(exports, "__esModule", {value: true});
let config = {
  // TODO set api key
  API_KEY: '',
  HOST: 'zvol3xi4anefvaawygsaashcqu.appsync-api.us-west-2.amazonaws.com',
  REGION: 'us-west-2',
  PATH: '/graphql',
  ENDPOINT: ''
};
config.ENDPOINT = `https://${config.HOST}${config.PATH}`;
exports.default = config;