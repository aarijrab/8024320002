const express = require('express');
const fetchNumbers = require('./fetchNumbers');
const { updateWindow, getWindow, getAverage } = require('./numberWindow');

const app = express();
const PORT = 9876;

const validTypes = ['p', 'f', 'e', 'r'];

app.get('/numbers/:numberid', async (req, res) => {
  const type = req.params.numberid;

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid number ID. Use p, f, e, or r.' });
  }

  const windowPrevState = getWindow();
  const numbers = await fetchNumbers(type);
  updateWindow(numbers);
  const windowCurrState = getWindow();
  const avg = getAverage();

  res.json({
    windowPrevState,
    windowCurrState,
    numbers,
    avg
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
