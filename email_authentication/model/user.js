const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        reset_password_link:{
            data: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('user',userSchema);
