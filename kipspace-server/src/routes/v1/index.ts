import { Router } from 'express';

import UserRouter from './user.router';
import LoginRouter from './login.router';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/user', UserRouter);
router.use('/login', LoginRouter);

// Export the base-router
export default router;
