import {Schema, model} from 'mongoose';

const UserSessionSchema = new Schema({
    username: { type: String, unique: true, required: true },
    hp: { type: Number, required: true },
    statuses: { type: [Number], required: true}
});

const UserSession = model('UserSession', UserSessionSchema);

export default UserSession;

