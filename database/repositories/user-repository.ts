import {Pool} from 'pg';

interface IOrderedData {
    username: string,
    email: string,
    password: string,
    class_id: number
}

class UserRepository {
    private database: Pool;

    constructor(database: Pool) {
        this.database = database;
    }

    public async createUser(data: IOrderedData) {
        return await this.database.query(
            'INSERT INTO users (username, email, password, class_id) VALUES ($1, $2, $3, $4) RETURNING id, username, email, password, class_id, created_at, updated_at',
            [data.username, data.email, data.password, data.class_id]
        );
    }

    public async updateUser(user_id: number, data: IOrderedData) {
        return await this.database.query(
            'UPDATE users SET username = $1, email = $2, password = $3, class_id = $4, updated_at = current_timestamp WHERE id = $5 RETURNING id, username, email, password, class_id, created_at, updated_at',
            [data.username, data.email, data.password, data.class_id, user_id]
        );
    }

    public async getUserByEmail(inputtedEmail: string) {
        return await this.database.query(
            'SELECT id, username, email, password, class_id FROM users WHERE email = $1',
            [inputtedEmail]
        );
    }

    public async getUserById(user_id: number) {
        return await this.database.query(
            'SELECT id, username, email, password, class_id FROM users WHERE id = $1',
            [user_id]
        );
    }
}

export default UserRepository;