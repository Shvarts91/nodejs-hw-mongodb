import { Router } from 'express';
import { validateContact } from '../middlewares/validateContact.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/auth/register',
  validateContact(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/auth/login',
  validateContact(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/auth/logout', ctrlWrapper(logoutUserController));

router.post(
  '/auth/send-reset-email',
  validateContact(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/auth/reset-pwd',
  validateContact(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
