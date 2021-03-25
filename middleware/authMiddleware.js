const jwt = require('jsonwebtoken');
const User = require('../model/userModel.js');

exports.protect = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};