require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    public login(request) {
        const { email, password } = request.body;

        //finding user in DB, compare inputted password and DB password, or returning error

        //later user_id will be hashed in jwt
        return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    }

    public signUp(request) {
        const { username, email, password, id } = request.body;
        const hashPassword = bcrypt.hashSync(password, 7);

        //Making user record in PostgreSQL
        //returning created user

        return {
            username,
            email,
            password: hashPassword,
            class_id: id,
        }
    }

    public updateInfo(request) {
        const { username, newPassword, id } = request.body;
        const hashNewPassword = bcrypt.hashSync(newPassword, 7);

        //Changing user post in PostgreSQL
        //returning updated user

        return {
            username,
            password: hashNewPassword,
            class_id: id
        }
    }
}

export default UserService;