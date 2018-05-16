#!/usr/bin/env node

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const faker = require('faker');
const shuffle = require('lodash.shuffle');

const writeFile = promisify(fs.writeFile);

const data = [...Array(100).keys()].map(i => ({
  id: i + 1,
  ...faker.helpers.userCard(),
}));

(async () => {
  try {
    const file = path.resolve(process.cwd(), 'data', 'data.json');
    await writeFile(file, JSON.stringify(shuffle(data), null, '\t'), 'utf-8');
    console.log(`Wrote fake data to ${file}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
