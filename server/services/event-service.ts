let listOfConnections = new Map();

class EventService {
    public connect(ws) {
        let id = Math.random() * (1000 - 1) + 1;
        listOfConnections.set(id, ws);
        return {
            listOfConnections,
            currentId: id
        };
    }
    public closeConnection(ws) {
        listOfConnections.forEach((client: WebSocket, key) => {
            if (client === ws) {
                listOfConnections.delete(key);
                return;
            }
        });
    }

    public attack(idOfAimUser, ws) {
        let mainId;
        for (let key of listOfConnections.keys()) {
            if (listOfConnections.get(key) === ws) {
                mainId = key;
            }
        }
        return {
            listOfConnections,
            changedSessionOfUser: true,
            currentId: mainId
        }
    }
    public applyAbility(idOfAimUser, ws) {
        let mainId;
        for (let key of listOfConnections.keys()) {
            if (listOfConnections.get(key) === ws) {
                mainId = key;
            }
        }
        return {
            listOfConnections,
            changedSessionOfUser: true,
            currentId: mainId
        }
    }
    public checkingAbilitySendingMessage(ws) {
        return {
            listOfConnections,
            abilitySendMessage: true
        }
    }
    public restore(ws) {
        let mainId;
        for (let key of listOfConnections.keys()) {
            if (listOfConnections.get(key) === ws) {
                mainId = key;
            }
        }
        return {
            listOfConnections,
            changedSessionOfUser: true,
            currentId: mainId
        }
    }
}

export default EventService;