require('dotenv').config();

const authenticate = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token || token !== process.env.API_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized access - Invalid or missing token' });
  }
  next();
};

module.exports = authenticate;
