const Users = require('../models/usersModel');

exports.getSavedProducts = async (req, res) => {
  try {
    const sub = req.params.id;
    const user = await Users.findOne({ sub: sub });
    if (
      req.headers.access_token &&
      String(user.access_token) === String(req.headers.access_token)
    ) {
      const savedProducts = await user.populate('savedProducts').execPopulate();
      res.status(201).json({
        status: 'sucess',
        saves: savedProducts.savedProducts,
      });
    } else {
      res.status(403).json({
        status: 'fail',
        message: 'Authentication failed',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getSavedProductsList = async (req, res) => {
  try {
    const userSub = req.params.id;
    const user = await Users.findOne({ sub: userSub });
    if (String(user.access_token) === String(req.headers.access_token)) {
      const savedProducts = await user.savedProducts;
      const likes = await user.likedProducts;
      res.status(201).json({
        status: 'sucess',
        saves: savedProducts,
        likes: likes,
      });
    } else {
      res.status(403).json({
        status: 'fail',
        message: 'Authentication failed',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
