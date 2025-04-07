const WINDOW_SIZE = 10;
let window = [];

function updateWindow(newNumbers) {
  const unique = newNumbers.filter(num => !window.includes(num));
  window = [...window, ...unique].slice(-WINDOW_SIZE);
}

function getWindow() {
  return [...window];
}

function getAverage() {
  if (window.length === 0) return 0;
  const sum = window.reduce((a, b) => a + b, 0);
  return parseFloat((sum / window.length).toFixed(2));
}

module.exports = {
  updateWindow,
  getWindow,
  getAverage
};
