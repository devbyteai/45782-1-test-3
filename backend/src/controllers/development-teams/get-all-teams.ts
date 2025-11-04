import { Request, Response } from 'express';
import DevelopmentTeam from '../../models/DevelopmentTeam';

export default async (req: Request, res: Response) => {
    try {
        const teams = await DevelopmentTeam.findAll({
            order: [['id', 'ASC']]
        });

        res.json(teams);
    } catch (error) {
        console.error('Error fetching development teams:', error);
        res.status(500).json({
            error: 'Failed to fetch development teams',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
