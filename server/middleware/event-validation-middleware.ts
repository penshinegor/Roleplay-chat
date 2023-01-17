import {TypeOfEvent} from '../../components/enums/event-enum';
import {OwnError} from '../error-handler/own-error';

function eventValidation(event) {
    event = JSON.parse(event);
    if (!event.type) {
        throw new OwnError('Wrong type of JSON', null);
    }
    if (!Object.values(TypeOfEvent).includes(event.type)) {
        throw new OwnError('Wrong type of event', null);
    }
    if (event.type === TypeOfEvent.Attack || event.type === TypeOfEvent.Ability) {
        if (!event.userId || (event.userId && typeof event.userId !== 'number')) {
            throw new OwnError('Wrong type of user Id or missing parameter', null);
        }
    }
    if (event.type === TypeOfEvent.Message) {
        if (!event.message) {
            throw new OwnError('Missing parameter "message"', null);
        }
    }
    return event;
}

export default eventValidation;