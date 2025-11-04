import { Router } from 'express';
import getMeetingsByTeam from '../controllers/meetings/get-meetings-by-team';
import addMeeting from '../controllers/meetings/add-meeting';
import validation from '../middlewares/validation';
import { addMeetingValidator } from '../validators/meeting.validator';

const router = Router();

// GET /api/meetings/team/:teamId - Get all meetings for a specific team
router.get('/team/:teamId', getMeetingsByTeam);

// POST /api/meetings - Add a new meeting
router.post('/', validation(addMeetingValidator), addMeeting);

export default router;
