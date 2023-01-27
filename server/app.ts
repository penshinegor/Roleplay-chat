require('dotenv').config();
import {WebSocket} from 'ws';
import server from './http';
import EventController from './controllers/event-controller';
import EventProvider from './services/event-provider';
import eventValidation from './middleware/event-validation-middleware';
import errorHandler from './error-handler/error-handler';
import {verifyToken} from './middleware/token-validation-middleware';
import * as mongoose from 'mongoose';
import MongoRepository from '../database/repositories/mongo-repository';

const PORT = 8080;

const start = async () => {
    await mongoose.connect(process.env.MONGO_DATABASE_URL).catch(err => {
        console.log(err);
    });
    server.listen(8080, () => {
        console.log(`Our server has been started on port ${PORT}...`);
    });
    console.log(`The WebSocket server is running on port ${PORT}...`);
}

start();

const wss: WebSocket = new WebSocket.Server({ server });
const eventController = new EventController();

wss.on('connection', (ws, req) => {
    try {
        verifyToken(req, ws, null);
        eventController.connectController(ws, req);
    } catch (err) {
        errorHandler(err, null, ws, null);
    }

    ws.on('message', (event) => {
        try {
            event = eventValidation(event);
            EventProvider.executeEvent(event, eventController, ws).catch(err => {
                errorHandler(err, null, ws, null);
            });
        }
        catch (err) {
            errorHandler(err, null, ws, null);
        }
    });

    ws.on('close', () => {
        eventController.closeController(ws);
    });

    ws.on('error', (error: Error) => {
        console.log('The server sent an error', error);
    });
});

const mongoRepository = new MongoRepository();

const gracefulShutdown = () => {
    console.info('SIGINT signal received.');
    console.log('Closing http server.');
    wss.clients.forEach(client => {
        client.send('The server was closed and all sessions were deleted');
        return client.terminate();
    });
    server.close(async () => {
        console.log('Http server closed.');
        await mongoRepository.deleteAllSessions().then(() => {
            console.log('Session was deleted.');
        });
        mongoose.connection.close(false, () => {
            console.log('MongoDb connection closed.');
            process.exit(0);
        });
    });
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
