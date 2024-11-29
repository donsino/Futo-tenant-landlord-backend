const mongoose = require('mongoose');

const HouseSchema = mongoose.Schema(
    
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },

        distription: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: false
        }
    },

    {
        timestamps: true
    }

)


const House = mongoose.model("House", HouseSchema);
module.exports = House;