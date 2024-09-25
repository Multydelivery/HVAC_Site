const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: {type: String,required: true },
    email: {type: String,require: true
    },
    phone: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
})

module.exports = mongoose.model('Appointment', appointmentSchema);

// above is in charge of import and export of the appointment model. It is a schema that defines the structure of the data that will be saved to the database. The schema is then exported to be used in the router.js file.
// this is like the blue print of the data that will be saved to the database