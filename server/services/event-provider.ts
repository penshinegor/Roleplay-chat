import {TypeOfEvent} from '../../components/enums/event-enum';
import EventController from '../controllers/event-controller';


class EventProvider {
    public static executeEvent(event, eventController: EventController, ws: WebSocket) {
        if (event.type === TypeOfEvent.Attack) {
            eventController.attackController(event, ws);
        } else if (event.type === TypeOfEvent.Ability) {
            eventController.applyAbilityController(event, ws);
        } else if (event.type === TypeOfEvent.Message) {
            eventController.sendMessageController(event, ws);
        } else {
            eventController.restoreController(ws);
        }
    }
}

export default EventProvider;