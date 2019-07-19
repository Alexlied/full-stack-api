var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact_email: {
        type: String,
        required: true
    },
    employees: {
        type: String
    }
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

module.exports = mongoose.model('Companies', schema)

// Company: The company that is leasing the rentable unit.
// name: (Required) The name of the company.
// contact_email: (Required) An email address that is used to contact the company. This should be validated so that only a valid email can be entered.
// employees: An array of the Employee resource, listed below.