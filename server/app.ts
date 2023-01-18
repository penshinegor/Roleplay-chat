import {WebSocket} from 'ws';
import server from './http';
import EventController from './controllers/event-controller';
import EventProvider from './services/event-provider';
import eventValidation from './middleware/event-validation-middleware';
import errorHandler from './error-handler/error-handler';
import {verifyToken} from './middleware/token-validation-middleware';

const PORT = 8080;

server.listen(8080, () => {
    console.log(`Our server has been started on port ${PORT}...`);
});

const wss: WebSocket = new WebSocket.Server({ server });
const eventController = new EventController();

wss.on('connection', (ws, req) => {
    try {
        verifyToken(req, ws, null);
        eventController.connectController(ws);
    } catch (err) {
        errorHandler(err, null, ws, null);
    }

    ws.on('message', (event) => {
        try {
            event = eventValidation(event);
            EventProvider.executeEvent(event, eventController, ws);
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

console.log(`The WebSocket server is running on port ${PORT}...`);
