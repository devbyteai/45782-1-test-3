import { Request, Response } from 'express';
import Meeting from '../../models/Meeting';
import DevelopmentTeam from '../../models/DevelopmentTeam';

export default async (req: Request, res: Response) => {
    try {
        const { development_team_id, start_datetime, end_datetime, description, room } = req.body;

        // Check if team exists
        const team = await DevelopmentTeam.findByPk(development_team_id);
        if (!team) {
            return res.status(404).json({
                error: 'Team not found',
                message: `Development team with ID ${development_team_id} does not exist`
            });
        }

        // Validate datetime logic
        const startDate = new Date(start_datetime);
        const endDate = new Date(end_datetime);

        if (endDate <= startDate) {
            return res.status(400).json({
                error: 'Invalid datetime',
                message: 'End datetime must be after start datetime'
            });
        }

        // Check for overlapping meetings
        const overlappingMeetings = await Meeting.findAll({
            where: {
                development_team_id
            }
        });

        // Checking foroverlaps 
        const hasOverlap = overlappingMeetings.some(existingMeeting => {
            const existingStart = new Date(existingMeeting.start_datetime);
            const existingEnd = new Date(existingMeeting.end_datetime);
            return !(endDate <= existingStart || startDate >= existingEnd);
        });

        if (hasOverlap) {
            return res.status(409).json({
                error: 'Meeting time conflict',
                message: 'This meeting time overlaps with another meeting already scheduled for this team'
            });
        }

        // Create new meeting
        const meeting = await Meeting.create({
            development_team_id,
            start_datetime,
            end_datetime,
            description,
            room
        });

        // Fetch the created meeting with team details
        const createdMeeting = await Meeting.findByPk(meeting.id, {
            include: [{
                model: DevelopmentTeam,
                attributes: ['id', 'name']
            }]
        });

        res.status(201).json(createdMeeting);
    } catch (error) {
        console.error('Error creating meeting:', error);
        res.status(500).json({
            error: 'Failed to create meeting',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
