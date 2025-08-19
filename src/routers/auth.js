import { Router } from 'express';
import { validateContact } from '../middlewares/validateContact.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
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

export default router;
