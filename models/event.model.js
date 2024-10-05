import mongoose from "mongoose";

const eventSchema = mongoose.Schema({     //  model for creating a new event 
	eventName: {
		type: String,
		required: true,
		
	},

    
    startDate:{             //  startDate & endDate contains date & time both in "2024-10-05T14:50" format
        type:String,
        required: true,
    },

    endDate:{               //  startDate & endDate contains date & time both in "2024-10-05T14:50" format
        type:String,
        required: true,
    },
    location:{
        type:String,
        required: true,
    },
	
	selectedImage: {
		type: String,
		default: "",
	},
	
});

export const Event = mongoose.model("Event", eventSchema);
