import { Request, Response } from 'express';
import Meeting from '../../models/Meeting';
import DevelopmentTeam from '../../models/DevelopmentTeam';

export default async (req: Request, res: Response) => {
    try {
        const teamId = parseInt(req.params.teamId);

        if (isNaN(teamId)) {
            return res.status(400).json({
                error: 'Invalid team ID',
                message: 'Team ID must be a valid number'
            });
        }

        // Check if team exists
        const team = await DevelopmentTeam.findByPk(teamId);
        if (!team) {
            return res.status(404).json({
                error: 'Team not found',
                message: `Development team with ID ${teamId} does not exist`
            });
        }

        const meetings = await Meeting.findAll({
            where: {
                development_team_id: teamId
            },
            include: [{
                model: DevelopmentTeam,
                attributes: ['id', 'name']
            }],
            order: [['start_datetime', 'ASC']]
        });

        res.json(meetings);
    } catch (error) {
        console.error('Error fetching meetings:', error);
        res.status(500).json({
            error: 'Failed to fetch meetings',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
