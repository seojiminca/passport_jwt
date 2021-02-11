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
            unique: true,
            trim: true
        },
        hashed: {
            type: String,
            required: true
        },
        reset_password_link:{
            data: String,
            default: ''
        },
        role: {
            type: String,
            default: "user"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('user',userSchema);
