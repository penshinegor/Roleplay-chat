import EventService from '../services/event-service';
import {OwnError} from '../error-handler/own-error';

let eventService = new EventService();

class EventController {
    public connectController(ws) {
        const { listOfConnections, currentId } = eventService.connect(ws);

        listOfConnections.forEach((client: WebSocket) => {
            if (client !== ws) {
                client.send(`New user has been connected by ${currentId} id`);
            }
        });
        if (listOfConnections.size !== 1) {
            listOfConnections.forEach((client: WebSocket, key) => {
                if (client !== ws) {
                    ws.send(`Session of client ${key}`);
                }
            });
        }
        console.log('New user has been connected');
    }
    public closeController(ws) {
        eventService.closeConnection(ws);
        console.log('One of users has been disconnected');
    }

    public attackController(event, ws) {
        const { listOfConnections, changedSessionOfUser, currentId} = eventService.attack(event.userId, ws);

        if (!changedSessionOfUser) {
            throw new OwnError('Impossibility to attack this user', 1011);
        }
        listOfConnections.forEach((client: WebSocket, key) => {
            if (key === event.userId) {
                client.send(`You were attacked from user by ${currentId} id`);
            }
            client.send(`Changed session from attack of user by ${event.userId} id`);
        });
    }
    public applyAbilityController(event, ws) {
        const { listOfConnections, changedSessionOfUser, currentId} = eventService.applyAbility(event.userId, ws);

        if (!changedSessionOfUser) {
            throw new OwnError('Impossibility to apply ability on this user', 1011);
        }
        listOfConnections.forEach((client: WebSocket, key) => {
            if (key === event.userId) {
                client.send(`You were applied ability from user by ${currentId} id`);
            }
            client.send(`Changed session from applying ability of user by ${event.userId} id`);
        });
    }
    public sendMessageController(event, ws) {
        const { listOfConnections, abilitySendMessage } = eventService.checkingAbilitySendingMessage(ws);

        if (!abilitySendMessage) {
            throw new OwnError('Impossibility to send message', 1011);
        }
        listOfConnections.forEach((client: WebSocket) => {
            client.send(event.message);
        });
    }
    public restoreController(ws) {
        const { listOfConnections, changedSessionOfUser, currentId } = eventService.restore(ws);

        if (!changedSessionOfUser) {
            throw new OwnError('Impossibility to restore', 1011);
        }
        listOfConnections.forEach((client: WebSocket) => {
            if (client === ws) {
                client.send('You were restored');
            }
            client.send(`Updated session from restoring of user by ${currentId} id`);
        });
    }

    // public listenEvents(wss) {
    //     wss.on('connection', (ws, req) => {
    //         try {
    //             verifyToken(req, ws, null);
    //             eventService.connect(ws);
    //         } catch (err) {
    //             errorHandler(err, null, ws, null);
    //         }
    //
    //         ws.on('message', (event) => {
    //             try {
    //                 eventValidation(event);
    //                 EventProvider.executeEvent(event, eventService, ws);
    //             }
    //             catch (err) {
    //                 errorHandler(err, null, ws, null);
    //             }
    //         });
    //
    //         ws.on('close', () => {
    //             eventService.close(ws);
    //         });
    //
    //         ws.on('error', (error: Error) => {
    //             console.log('The server sent an error', error);
    //         });
    //     });
    // }
}

export default EventController;
