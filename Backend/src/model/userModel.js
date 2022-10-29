const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
            trim: true
        },
        lastName: {
            type: String,
            require: true,
            trim: true
        },
        careerObjective: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            require: true,
            trim: true
        },
        shortid: {
            type: String,
            trim: true
        },
        verifyLink: {
            type: String,
            trim: true
        },
        verified: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
)

module.exports = mongoose.model("EmailBasedAuth", userSchema)