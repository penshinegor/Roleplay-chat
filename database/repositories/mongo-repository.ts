import UserSession from '../models/user-session';

interface IMongoData {
    username: string,
    hp: number,
    statuses: number[]
}

class MongoRepository {
    public async createUserSession(data: IMongoData) {
        const userSession = await new UserSession({
            username: data.username,
            hp: data.hp,
            statuses: data.statuses
        });
        await userSession.save();
        return userSession;
    }

    public async getUserSessionByUsername(username: string) {
        return await UserSession.findOne({ username });
    }

    public async getUserSessionById(id: string) {
        return await UserSession.findOne({ _id: id });
    }

    public async getAllUserSessions() {
        return await UserSession.find();
    }

    public async deleteSession(username: string) {
        return await UserSession.deleteOne({ username });
    }

    public async recreateUserSession(data: IMongoData) {
        await this.deleteSession(data.username);
        return await this.createUserSession(data);
    }

    public async deleteAllSessions() {
        return await UserSession.deleteMany();
    }
}

export default MongoRepository;