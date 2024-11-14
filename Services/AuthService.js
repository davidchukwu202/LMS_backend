const UserService = require('./UserService.js');
const bcrypt = require('bcryptjs');
const { createSecretToken } = require('../util/SecretToken.js');
const generatePassword = require("../util/password.js");
const passport = require('passport');

class AuthService {
    async login (email, password){
        const user = await UserService.findUser({ email })
        if (!user) { 
            return {status: 401, message: 'Incorrect email or password', token: null};
        }
        
        const auth = await bcrypt.compare(password, user.password);
        //console.log(auth, bcrypt.user.password);
        if(!auth) {
            return {status: 401, message: 'Incorrect email or password', token: null};
        }

        return {token: createSecretToken(user._id), success: true, status: 200};
    };

    async signUp (email, password, username) {
        // Check if the user already exists
        const existingUser = await UserService.findUser({email});
        if (existingUser) return {status:400, message: 'User already exists', token: null, user: existingUser};

        // Hash the Password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create a new User
        const user = await UserService.create({email, password, username});
        console.log(user);
        if (user) {
            const token = createSecretToken(user._id);
            return {status: 200, message: 'User signed up successfully', token: token, user: user, success: true};
        }else {
            throw new Error('Database user-creation error');
        }

    };

    async g_signUp (email, username){
        let password = generatePassword();
        // setup email autosend password.
        console.log(`This is the supposed emailed password: ${password}`);
        return this.signUp(email, password, username);
    };

};

module.exports = new AuthService();