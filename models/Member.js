const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    memberId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    clubName: {
        type: String,
        required: true
    },
    yearOfStudy: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    interests: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        default: "Active"
    }
});

module.exports = mongoose.model("Member", memberSchema);