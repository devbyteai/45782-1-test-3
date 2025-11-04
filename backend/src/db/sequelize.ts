import { Sequelize } from 'sequelize-typescript';
import config from 'config';
import DevelopmentTeam from '../models/DevelopmentTeam';
import Meeting from '../models/Meeting';

const sequelize = new Sequelize({
    host: config.get('db.host'),
    port: config.get('db.port'),
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.database'),
    dialect: 'mysql',
    models: [DevelopmentTeam, Meeting],
});

export default sequelize;
