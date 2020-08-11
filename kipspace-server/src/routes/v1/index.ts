import { Router } from 'express';
import UserRouter from './user.router';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/user', UserRouter);

// Export the base-router
export default router;
