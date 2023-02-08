import {TypeOfEvent} from '../../components/enums/event-enum';
import EventController from '../controllers/event-controller';

class EventProvider {
    public static async executeEvent(event, eventController: EventController, ws: WebSocket) {
        if (event.type === TypeOfEvent.Attack) {
            await eventController.attackController(event, ws);
        } else if (event.type === TypeOfEvent.Ability) {
            await eventController.applyAbilityController(event, ws);
        } else if (event.type === TypeOfEvent.Message) {
            await eventController.sendMessageController(event, ws);
        } else {
            await eventController.restoreController(ws);
        }
    }
}

export default EventProvider;