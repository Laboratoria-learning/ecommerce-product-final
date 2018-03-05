const express = require('express');
const router = express.Router();

router.route('/alcatel')
  .get(console.log('mely'));

module.exports = router;
