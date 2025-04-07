const express = require('express');
const router = express.Router();
const fetchNumbers = require('../services/fetchNumbers');
const windowManager = require('../utils/numberWindow');

router.get('/:type', async (req, res) => {
  const { type } = req.params;
  const validTypes = ['p', 'f', 'e', 'r'];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid number type' });
  }

  const prevState = windowManager.getWindow();

  try {
    const numbers = await fetchNumbers(type);
    windowManager.updateWindow(numbers);

    const currState = windowManager.getWindow();
    const avg = windowManager.getAverage();

    res.json({
      windowPrevState: prevState,
      windowCurrState: currState,
      numbers,
      avg: Number(avg.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
