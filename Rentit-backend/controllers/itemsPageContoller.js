const fs = require('fs');

const items = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/fakedata.json`)
);

exports.getItems = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    results: items.length,
    data: {
      items: items,
    },
  });
};
exports.getItemDetails = (req, res) => {
  const item = items.find((e) => e.id == req.params.id);
  if (req.params.id > items.length - 1)
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });

  res.status(200).json({
    status: 'sucess',
    data: {
      item: item,
    },
  });
};
