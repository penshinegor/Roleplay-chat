import MongoRepository from '../../database/repositories/mongo-repository';
import UserRepository from '../../database/repositories/user-repository';
import {postgreDB} from '../../database/postgre-database';
import {OwnError} from '../error-handler/own-error';
import {TypeOfAbility, TypeOfAttack} from '../../components/enums/heroes-enums';

let listOfConnections = new Map();

const mongoRepository = new MongoRepository();
const userRepository = new UserRepository(postgreDB);

class EventService {
    public async connect(ws, request) {
        const response = await userRepository.getUserAndClassByUserId(request.user.id);
        const userAndClass = response.rows[0];
        const userSession = await mongoRepository.createUserSession({ username: userAndClass.username, hp: userAndClass.health, statuses: [] });
        listOfConnections.set(userSession.username, ws);
        const allSessions = await mongoRepository.getAllUserSessions();

        return {
            listOfConnections,
            currentId: userSession._id,
            allSessions
        };
    }
    public async closeConnection(ws) {
        listOfConnections.forEach(async (client: WebSocket, key) => {
            if (client === ws) {
                await mongoRepository.deleteSession(key);
                listOfConnections.delete(key);
                return;
            }
        });
    }

    public async attack(idOfAimUser, ws) {
        let mongoUsername;
        for (let key of listOfConnections.keys()) {
            if (listOfConnections.get(key) === ws) {
                mongoUsername = key;
            }
        }
        const currentUserSession = await mongoRepository.getUserSessionByUsername(mongoUsername);
        if (currentUserSession.hp === 0) {
            throw new OwnError('Impossibility to attack, your health is equal 0', 1011);
        }
        if (currentUserSession._id.toString() === idOfAimUser) {
            throw new OwnError('Impossibility to attack, id of aim user cannot equal yourself id', 1011);
        }
        const response = await userRepository.getUserAndClassByUsername(mongoUsername);
        const userAndClass = response.rows[0];
        const aimUserSession = await mongoRepository.getUserSessionById(idOfAimUser);
        if (!aimUserSession) {
            throw new OwnError('Impossibility to attack, aim user id not exist', 1011);
        }
        if (aimUserSession.hp === 0) {
            throw new OwnError('Impossibility to attack, aim user health is equal 0', 1011);
        }
        if (aimUserSession.statuses.includes(TypeOfAbility.RunningAwayForInvulnerability)) {
            throw new OwnError('Impossibility to attack, aim user ran away for invulnerability', 1011);
        }
        if (aimUserSession.statuses.includes(TypeOfAbility.DefendingFromPhysicalDamage) && (userAndClass.attack_type === TypeOfAttack.HittingFireSwords || userAndClass.attack_type === TypeOfAttack.FiringFromTrustyBow)) {
            throw new OwnError('Impossibility to attack, aim user has defending from physical damage', 1011);
        }
        await this.changeSessionFromAttack(aimUserSession, userAndClass.damage);
        return {
            listOfConnections,
            changedSessionOfUser: aimUserSession,
            currentId: currentUserSession._id.toString()
        }
    }
    public async applyAbility(idOfAimUser, ws) {
        let mongoUsername;
        for (let key of listOfConnections.keys()) {
            if (listOfConnections.get(key) === ws) {
                mongoUsername = key;
            }
        }
        const currentUserSession = await mongoRepository.getUserSessionByUsername(mongoUsername);
        if (currentUserSession.hp === 0) {
            throw new OwnError('Impossibility to apply ability, your health is equal 0', 1011);
        }
        if (currentUserSession.statuses.includes(TypeOfAbility.HexingTheHero)) {
            throw new OwnError('Impossibility to apply ability, you are in hexing', 1011);
        }
        const response = await userRepository.getUserAndClassByUsername(mongoUsername);
        const currentUserAndClass = response.rows[0];
        if (currentUserAndClass.ability === TypeOfAbility.DefendingFromPhysicalDamage || currentUserAndClass.ability === TypeOfAbility.RunningAwayForInvulnerability) {
            if (currentUserSession._id.toString() !== idOfAimUser) {
                throw new OwnError('Wrong aim user id, you can apply the ability only on yourself', 1011);
            }
            if (currentUserSession.statuses.includes(TypeOfAbility.DefendingFromPhysicalDamage) || currentUserSession.statuses.includes(TypeOfAbility.RunningAwayForInvulnerability)) {
                throw new OwnError('You cannot apply ability again, action of the past ability has not ended', 1011);
            }
            await this.changeSessionFromApplyAbility(currentUserSession, currentUserAndClass.ability, idOfAimUser);
            return {
                listOfConnections,
                changedSessionOfUser: currentUserSession,
                currentId: currentUserSession._id.toString()
            }
        }
        const aimUserSession = await mongoRepository.getUserSessionById(idOfAimUser);
        if (!aimUserSession) {
            throw new OwnError('Impossibility to apply ability, aim user id not exist', 1011);
        }
        if (aimUserSession.hp === 0) {
            throw new OwnError('Impossibility to apply ability, aim user health is equal 0', 1011);
        }
        if (aimUserSession.statuses.includes(TypeOfAbility.RunningAwayForInvulnerability)) {
            throw new OwnError('Impossibility to apply ability, aim user ran away for invulnerability', 1011);
        }
        if (aimUserSession.statuses.includes(TypeOfAbility.HexingTheHero) && currentUserAndClass.ability === TypeOfAbility.HexingTheHero) {
            throw new OwnError('Impossibility to apply ability, aim user already is in hexing', 1011);
        }
        if (currentUserAndClass.ability === TypeOfAbility.HexingTheHero && currentUserSession._id.toString() === idOfAimUser) {
            throw new OwnError('Impossibility to apply ability, you cannot apply ability on yourself', 1011);
        }
        await this.changeSessionFromApplyAbility(aimUserSession, currentUserAndClass.ability, idOfAimUser);
        return {
            listOfConnections,
            changedSessionOfUser: aimUserSession,
            currentId: currentUserSession._id.toString()
        }
    }
    public async checkingAbilitySendingMessage(ws) {
        let mongoUsername;
        for (let key of listOfConnections.keys()) {
            if (listOfConnections.get(key) === ws) {
                mongoUsername = key;
            }
        }
        const userSession = await mongoRepository.getUserSessionByUsername(mongoUsername);
        if (userSession.hp === 0) {
            throw new OwnError('Impossibility to send message, your health is equal 0', 1011);
        }
        return {
            listOfConnections,
            currentId: userSession._id.toString()
        }
    }
    public async restore(ws) {
        let mongoUsername;
        for (let key of listOfConnections.keys()) {
            if (listOfConnections.get(key) === ws) {
                mongoUsername = key;
            }
        }
        const userSession = await mongoRepository.getUserSessionByUsername(mongoUsername);
        if (userSession.hp !== 0) {
            throw new OwnError('Impossibility to restore, your health is not equal 0', 1011);
        }
        const response = await userRepository.getUserAndClassByUsername(mongoUsername);
        const userAndClass = response.rows[0];
        const newUserSession = await mongoRepository.recreateUserSession({ username: userAndClass.username, hp: userAndClass.health, statuses: [] });
        return {
            listOfConnections,
            newUserSession,
            currentId: newUserSession._id.toString()
        }
    }

    private async changeSessionFromApplyAbility(session, ability, idOfAimUser) {
        session.statuses.push(ability);
        await session.save();
        setTimeout(async () => {
            session = await mongoRepository.getUserSessionById(idOfAimUser)
            if (!session) {
                return;
            }
            session.statuses.forEach((status, index) => {
                if (status === ability) {
                    session.statuses.splice(index, 1);
                    return;
                }
            })
            await session.save();
        }, 30000);
        return session;
    }
    private async changeSessionFromAttack(session, damage) {
        if (session.hp < damage) {
            session.hp = 0;
            await session.save();
            return;
        }
        session.hp -= damage;
        await session.save();
    }
}

export default EventService;