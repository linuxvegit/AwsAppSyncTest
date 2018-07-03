"use strict"

global.WebSocket = require('ws');
global.window = global.window || {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  WebSocket: global.WebSocket,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener: () => {},
  navigator: {
    onLine: true
  }
};
global.localStorage = {
  store: {},
  getItem: key => this.store[key],
  setItem: (key, value) => this.store[key] = value,
  removeItem: key => delete this.store[key]
};
require('es6-promise').polyfill();
require('isomorphic-fetch');

const aws_export = require('./aws-exports').default;

const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;

const url = aws_export.ENDPOINT;
const region = aws_export.REGION;
const apiKey = aws_export.API_KEY;
const type = AUTH_TYPE.API_KEY;

const gql = require('graphql-tag');

const query = gql(`
query TestGet {
    get(id: 123 meta: "testing"){
    id
    meta
  }
}`);

const subquery = gql(`
subscription NewSub {
  new {
    __typename
    id
    title
    meta
  }
}`);
console.log('before new');
const client = new AWSAppSyncClient({
  url: url,
  region: region,
  auth: {
    type: type,
    apiKey: apiKey
  }
});

client.hydrated().then(client => {
  console.log('start');
  const observable = client.subscribe({
    query: subquery
  });

  observable.subscribe({
    next: data=>{console.log('realtime data: ', data)},
    complete: console.log,
    error: console.error
  });
});