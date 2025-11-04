import express from 'express';
import cors from 'cors';
import config from 'config';
import sequelize from './db/sequelize';
import developmentTeamsRouter from './routers/development-teams';
import meetingsRouter from './routers/meetings';
import notFound from './middlewares/not-found';
import errorResponder from './middlewares/error/responder';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/development-teams', developmentTeamsRouter);
app.use('/api/meetings', meetingsRouter);

// Error handling
app.use(notFound);
app.use(errorResponder);

const PORT = config.get('app.port');
const APP_NAME = config.get('app.name');

// Database connection and sync
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synced successfully');
        app.listen(PORT, () => {
            console.log(`${APP_NAME} is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to sync database:', error);
    });

export default app;
