const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register new citizen or user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password, address, village, wardNumber, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (Name, Email, Password)'
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email address already exists'
      });
    }

    // Create user (default role is citizen unless specified)
    const userRole = role && ['admin', 'staff', 'citizen'].includes(role) ? role : 'citizen';

    const user = await User.create({
      name,
      email,
      mobile: mobile || '9876543210',
      password,
      address: address || '',
      village: village || 'Rampur',
      wardNumber: wardNumber || 'Ward 1',
      role: userRole
    });

    if (user) {
      const token = generateToken(user._id, user.role);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          village: user.village,
          wardNumber: user.wardNumber,
          address: user.address,
          token
        }
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data provided' });
    }
  } catch (error) {
    console.error('[Register Error]', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter registered email address and password'
      });
    }

    // Find user by email and select password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Optional role check if client specified role
    if (role && user.role !== role) {
      return res.status(401).json({
        success: false,
        message: `Account exists but is registered as '${user.role}', not '${role}'. Please select correct portal role.`
      });
    }

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        village: user.village,
        wardNumber: user.wardNumber,
        address: user.address,
        token
      }
    });
  } catch (error) {
    console.error('[Login Error]', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Forgot Password - Generate reset token
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user account found with this email address'
      });
    }

    // Generate random 20-byte token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire time to 10 minutes
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // For development / B.Tech academic demo: Return token directly in response
    res.status(200).json({
      success: true,
      message: 'Password reset token generated successfully',
      resetToken: resetToken,
      resetUrl: `/reset-password/${resetToken}`
    });
  } catch (error) {
    console.error('[Forgot Password Error]', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reset Password using token
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Reset token and new password are required'
      });
    }

    // Hash token to compare with database stored hash
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token'
      });
    }

    // Set new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });
  } catch (error) {
    console.error('[Reset Password Error]', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword
};
