import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import AdminUser from '../models/AdminUser.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please authenticate as administrator.',
    });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    const user = await AdminUser.findById(decoded.id).select('-password');

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Administrator account not found or deactivated.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session token. Please log in again.',
    });
  }
};
