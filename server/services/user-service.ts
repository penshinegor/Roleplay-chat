require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import UserProvider from './user-provider';
import UserRepository from '../../database/repositories/user-repository';
import {postgreDB} from '../../database/database';
import {OwnError} from '../error-handler/own-error';

const userRepository = new UserRepository(postgreDB);

class UserService {
    public async login(request) {
        const { email, password } = request.body;
        const response = await userRepository.getUserByEmail(email);
        const user = response.rows[0];
        if (!user) {
            throw new OwnError('User doesn\'t exist with this email', 400);
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new OwnError('Wrong password', 400);
        }

        return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    }

    public async signUp(request) {
        const { username, email, password, id } = request.body;
        const hashPassword = bcrypt.hashSync(password, 7);
        const response = await userRepository.createUser({ username, email, password: hashPassword, class_id: id });

        return UserProvider.createUser(
            response.rows[0].id,
            response.rows[0].username,
            response.rows[0].email,
            response.rows[0].password,
            response.rows[0].class_id,
            response.rows[0].created_at,
            response.rows[0].updated_at,
        );
    }

    public async updateInfo(request) {
        const { username, pastPassword, newPassword, id } = request.body
        let response = await userRepository.getUserById(request.user.id);
        let user = response.rows[0];
        if (!bcrypt.compareSync(pastPassword, user.password)) {
            throw new OwnError('Wrong past password', 400);
        }
        if (user.username === username) {
            throw new OwnError('New username must not be equal past username', 400);
        }
        if (user.class_id === Number(id)) {
            throw new OwnError('New class_id must not be equal past class_id', 400);
        }
        const hashNewPassword = bcrypt.hashSync(newPassword, 7);
        response = await userRepository.updateUser(user.id, { username, email: user.email, password: hashNewPassword, class_id: id });

        return UserProvider.createUser(
            response.rows[0].id,
            response.rows[0].username,
            response.rows[0].email,
            response.rows[0].password,
            response.rows[0].class_id,
            response.rows[0].created_at,
            response.rows[0].updated_at,
        );
    }
}

export default UserService;