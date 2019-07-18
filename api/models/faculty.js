var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: [{
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: Number,
            required: true
        },
        preferred_name: {
            type: Number
        }
    }],
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

module.exports = mongoose.model('Faculty', schema)

// Faculty
// First and last name
// Preferred name or nickname
// Email address
// Role