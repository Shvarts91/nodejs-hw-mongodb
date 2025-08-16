import { Router } from 'express';
import { validateContact } from '../middlewares/validateContact';
import { loginUserSchema, registerUserSchema } from '../validation/auth';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth';

const router = Router();

router.post(
  '/register',
  validateContact(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateContact(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/logout', ctrlWrapper(logoutUserController));
