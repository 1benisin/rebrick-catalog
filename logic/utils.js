const fs = require('fs');
const csv = require('csv-parser');
const OAuth = require('oauth').OAuth;

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function randomBetween(low, high) {
  return Math.floor(Math.random() * high) + low;
}

export function fetchBricklinkURL(url) {
  return new Promise((resolve, reject) => {
    var oauth = new OAuth(
      '',
      '',
      process.env.NEXT_PUBLIC_BRICKLINK_CONSUMER_KEY,
      process.env.NEXT_PUBLIC_BRICKLINK_CONSUMER_SECRET,
      '1.0',
      null,
      'HMAC-SHA1'
    );

    oauth.get(
      url,
      process.env.NEXT_PUBLIC_BRICKLINK_TOKEN_VALUE,
      process.env.NEXT_PUBLIC_BRICKLINK_TOKEN_SECRET,
      (error, data, response) => {
        if (error) reject(error);
        const responseObj = JSON.parse(data).data;
        resolve(responseObj);
      }
    );
  });
}

export function readCSV(fileURL) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(fileURL)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      });
  });
}

export function splitArrayIntoParts(array, parts) {
  const numberOfParts = Math.ceil(parts); // prevents decimal numbers
  let result = [];
  for (let i = numberOfParts; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}
