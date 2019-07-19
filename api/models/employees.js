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
    position: {
        type: String
    },
    birthday: {
        type: String
    },
    email: {
        type: String,
        required: true
    }
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

module.exports = mongoose.model('Employees', schema)

// first_name: (Required) The given first name of the employee.
// last_name: (Required) The given last name of the employee.
// preferred_name: The preferred name (i.e. nickname) of the employee.
// position: The employee's title at the company.
// birthday: The employee's date of birth.
// email: (Required) An email address to contact the given employee. This should be validated so that only a valid email can be entered.