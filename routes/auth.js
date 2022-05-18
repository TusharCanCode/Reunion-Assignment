const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const maxAge = 24 * 60 * 60;
require('dotenv').config();

//Route-1: Authenticating an existing user
router.post('/', async (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;

    try {
        const user = await User.login(email, password);
        //Generating JWT for signed in user
        const authToken = generateAccessToken(user);
        //Storing the JWT inside cookie
        res.cookie('JWT', authToken, { httpOnly: true, maxAge: maxAge * 1000, sameSite: "lax" });
        res.status(200).json(authToken);

    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ error: errors });
    }
});

//Utility Functions
function handleErrors(err) {
    const errors = { userName: '', email: '', password: '', alert: '' };
    if (err.message === "Invalid Credentials")
        errors.alert = "Invalid credentials";

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if (err.code === 11000)
        errors.alert = "User already exists";

    return errors;
}

function generateAccessToken(user) {
    return jwt.sign({ user: { id: user._id } }, process.env.ACCESS_TOKEN, { expiresIn: maxAge });
}

module.exports = router;