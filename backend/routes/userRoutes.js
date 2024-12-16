import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controlllers/userController.js';

import { protect } from '../middleware/authMiddle.js';

router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logoutUser', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router; 
