const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Username cannot be empty"],
        unique: true,
        minlength: [5, "Username length must be between 5 to 50 characters"],
        maxlength: [50, "Username length must be between 5 to 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty"],
        unique: true,
        validate: [ValidateEmail, "Enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password cannot be empty"],
        minlength: [8, "Password length must be between 8 to 25 characters"],
        maxlength: [25, "Password length must be between 8 to 25 characters"],
        validate: [ValidatePassword, "Invalid Password - Your password must be between 8 to 25 characters, should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character!"]
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
},

    { timestamps: true }

);

//Static Method for Login
userSchema.statics.login = async function (email, password) {
    try {
        const user = await this.findOne({ email });
        if (user) {
            if (password != user.password)
                throw Error("Invalid Credentials");

            return user;
        }
        throw Error("Invalid Credentials");

    } catch (error) {
        throw Error("Invalid Credentials");
    }
}

//Utility Functions
function ValidateEmail(mail) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!(mail.match(mailformat)))
        return false;

    return true;
}

function ValidatePassword(password) {
    let paswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/;
    if (!(password.match(paswd)))
        return false;

    return true;
}

let User = new mongoose.model('User', userSchema);
module.exports = User;