const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.json({ name: 'Express Productasdasdasdsa' }); // Express 서버가 반환하는 JSON
  });

  module.exports = router;