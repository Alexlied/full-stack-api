var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    location: [{
        building_address: {
            type: String,
            required: true
        },
        room_number: {
            type: Number,
            required: true
        }
    }]
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

module.exports = mongoose.model('Courses', schema)


// Courses
// Name of the course
// Start Date for the course
// End Date for the course
// Location including building address and room number


