const axios = require('axios');

const apiMap = {
  p: 'primes',
  f: 'fibo',
  e: 'even',
  r: 'rand'
};

module.exports = async function fetchNumbers(type, token) {
  const url = `http://20.244.56.144/evaluation-service/${apiMap[type]}`;

  try {
    const res = await axios.get(url, {
      timeout: 500,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0MDM0NTQwLCJpYXQiOjE3NDQwMzQyNDAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjRiZTJmMDgwLTUxNjMtNDQ0Zi1hMGYyLTMzYjBlYmYxMTkxYyIsInN1YiI6ImFyYWJiYW5pX21lMjRAdGhhcGFyLmVkdSJ9LCJlbWFpbCI6ImFyYWJiYW5pX21lMjRAdGhhcGFyLmVkdSIsIm5hbWUiOiJhYXJpaiByYWJiYW5pIiwicm9sbE5vIjoiODAyNDMyMDAwMiIsImFjY2Vzc0NvZGUiOiJYcnllSEQiLCJjbGllbnRJRCI6IjRiZTJmMDgwLTUxNjMtNDQ0Zi1hMGYyLTMzYjBlYmYxMTkxYyIsImNsaWVudFNlY3JldCI6InZXSmtGTlBQUUNZZE1HSHIifQ.3NOrpyYfoBVr1-uDl4BLVI3XrnKlkgA-FMVJ1TjyRvI`
      }
    });
    return res.data.numbers || [];
  } catch (err) {
    console.error(`Error fetching ${type}:`, err.message);
    return [];
  }
};
