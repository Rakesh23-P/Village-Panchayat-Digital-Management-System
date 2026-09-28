const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'panchayat_digital_secret_key_2026_btech',
    {
      expiresIn: '30d'
    }
  );
};

module.exports = generateToken;
