import EventService from '../services/event-service';

let eventService = new EventService();

class EventController {
    public async connectController(ws, request) {
        const { listOfConnections, currentId, allSessions, messageCache } = await eventService.connect(ws, request);

        listOfConnections.forEach((client: WebSocket) => {
            if (client !== ws) {
                client.send(`New user has been connected by ${currentId} id`);
            }
        });
        ws.send(`Sessions of all users: ${JSON.stringify(allSessions)}`);
        if (messageCache) {
            messageCache.forEach(message => {
                ws.send(message);
            });
        }
    }
    public async closeController(ws) {
        await eventService.closeConnection(ws);
    }

    public async attackController(event, ws) {
        const { listOfConnections, changedSessionOfUser, currentId } = await eventService.attack(event.userId, ws);

        const actionMessage = `Changed session of user by ${changedSessionOfUser._id.toString()} from attack by ${currentId} id user: ${JSON.stringify(changedSessionOfUser)}`;
        await eventService.cacheMessage(actionMessage);
        listOfConnections.forEach((client: WebSocket, key) => {
            if (changedSessionOfUser.username === key) {
                client.send(`You were attacked from from user by ${currentId} id`);
            }
            client.send(actionMessage);
        });
    }
    public async applyAbilityController(event, ws) {
        const { listOfConnections, changedSessionOfUser, currentId } = await eventService.applyAbility(event.userId, ws);

        const actionMessage = `Changed session of user by ${changedSessionOfUser._id.toString()} from applying ability by ${currentId} id user: ${JSON.stringify(changedSessionOfUser)}`;
        await eventService.cacheMessage(actionMessage);
        listOfConnections.forEach((client: WebSocket, key) => {
            if (changedSessionOfUser.username === key) {
                if (changedSessionOfUser._id.toString() === currentId) {
                    client.send(`You were applied ability on yourself`);
                } else {
                    client.send(`You were applied ability from user by ${currentId} id`);
                }
            }
            client.send(actionMessage);
        });
    }
    public async sendMessageController(event, ws) {
        const { listOfConnections, currentId } = await eventService.checkingAbilitySendingMessage(ws);

        const actionMessage = `User by ${currentId} id send message: ${event.message}`;
        await eventService.cacheMessage(actionMessage);
        listOfConnections.forEach((client: WebSocket) => {
            client.send(actionMessage);
        });
    }
    public async restoreController(ws) {
        const { listOfConnections, newUserSession, currentId } = await eventService.restore(ws);

        const actionMessage = `Changed user session from restore by ${currentId} id: ${JSON.stringify(newUserSession)}`;
        await eventService.cacheMessage(actionMessage);
        listOfConnections.forEach((client: WebSocket) => {
            if (client === ws) {
                client.send('You were restored');
            }
            client.send(actionMessage);
        });
    }
}

export default EventController;
