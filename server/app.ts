import {WebSocket} from 'ws';
import server from './http';
import EventController from './controllers/event-controller';
import eventValidation from './middleware/event-validation-middleware';
import EventProvider from './services/event-provider';
import errorHandler from './error-handler/error-handler';

const PORT = 8080;

server.listen(8080, () => {
    console.log(`Our server has been started on port ${PORT}...`);
});

const wss: WebSocket = new WebSocket.Server({ server });
const eventController = new EventController();

wss.on('connection', ws => {

    eventController.connectController(ws);

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
