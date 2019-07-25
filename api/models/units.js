var mongoose = require('mongoose');
const Companies = require('./companies').schema;

var schema = new mongoose.Schema({
    kind: {
        type: String,
        required: true,
        enum: [
            "seat",
            "desk",
            "small office",
            "large office",
            "floor"
        ]
    },
    floor: {
        type: Number,
        required: true
    },
    special_monthly_offer: {
        type: Number
    },
    company: {
        type: Companies
    }
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

module.exports = mongoose.model('Units', schema)


// kind: (Required) The kind of unit available. Only the following options should be allowed: "seat", "desk", "small office", "large office", "floor".
// floor: (Required) An integer which represents the floor the rentable unit is on.
// special_monthly_offer: An optional integer field. If filled in, represents a special deal that the company will be paying in cents. For example, if the unit is being leased for $600/mo, this field would be 600000.
// company: The Company resource, listed below.

