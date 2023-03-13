const express = require('express');
const router = express.Router();
const {
  getItemDetails,
  getItems,
} = require('./../controllers/itemsPageContoller');

router.route('/').get(getItems);
router.route('/:id').get(getItemDetails);

module.exports = router;
