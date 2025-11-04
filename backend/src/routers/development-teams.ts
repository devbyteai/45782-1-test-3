import { Router } from 'express';
import getAllTeams from '../controllers/development-teams/get-all-teams';

const router = Router();

// GET /api/development-teams - Get all development teams
router.get('/', getAllTeams);

export default router;
