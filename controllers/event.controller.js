import { Event } from "../models/event.model.js";         // importing event model 

export async function createEvent(req, res) {          // function for creating events

    try {
        const { eventName, startDate, endDate, location, selectedImage } = req.body;

        // ===============    startDate & endDate contains date & time both in "2024-10-05T14:50" format  ======================== //

        if (!eventName || !startDate || !endDate || !location || !selectedImage) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }



        //  here we are extracting the date from the startDate input by splitting at "T"  as it is a string value  containing both date & time joined by "T" 
        let givenStartDate = startDate;
        let startDateTimeArr = givenStartDate.split("T");
        const startDateCmp = new Date(startDateTimeArr[0]);
        //--------------------------------------




        // //  here we are extracting the date from the endDate input by splitting at "T"  as it is a string value  containing both date & time joined by "T" 
        let givenEndDate = endDate;
        let endDateTimeArr = givenEndDate.split("T");
        let endDateCmp = new Date(endDateTimeArr[0]);
        //------------------------------------------





        if (startDateCmp > endDateCmp) {    // comparing start and end date  of the event
            return res.status(400).json({ success: false, message: "Start date&time must be earlier than End date&time " });
        }



        let startTimeCmp = cnvt_24hr_to_AmPm_format(startDateTimeArr[1]);   // calling function for converting 24 hr time to AM/PM format
        let endTimeCmp = cnvt_24hr_to_AmPm_format(endDateTimeArr[1]);     // calling function for converting 24 hr time to AM/PM format





        const cmpres = compareTimes(startTimeCmp, endTimeCmp)    // calling compare time function for comparing start and end of event time 
        if (!(startDateCmp === endDateCmp) && cmpres == false) {
            return res.status(400).json({ success: false, message: "Start date&time must be earlier than End date&time " });
        }



        const newEvent = new Event({
            eventName,
            startDate,
            endDate,
            location,
            selectedImage
        });


        await newEvent.save();        // saving the newly created event in MongoDB

        res.status(201).json({
            success: true,
            event: {
                ...newEvent._doc,

            },
        });
    } catch (error) {
        // console.log("Error in event controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}



export async function getAllEvents(req, res) {        // function for getting all the events from the Database
    try {
        const allEvents = await Event.find({}); // find all products
        res.json({ allEvents });
    } catch (error) {
        // console.log("Error in getAllEvents controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



function cnvt_24hr_to_AmPm_format(inputTime) {

    let getStartTime = inputTime;
    let getStartHour = +(getStartTime[0] + getStartTime[1])
    let getStartMinute = +(getStartTime[3] + getStartTime[4])
    let newformatStart = getStartHour >= 12 ? 'PM' : 'AM';
    getStartHour = getStartHour % 12;
    getStartHour = getStartHour ? getStartHour : 12;
    getStartMinute = getStartMinute < 10 ? '0' + getStartMinute : getStartMinute;
    let startTimeCmp = getStartHour + ':' + getStartMinute + ' ' + newformatStart;
    return startTimeCmp;

}

function convtTo24HourFormat(timeStr) {               //  function to convert 24Hr time format to  'hh:mm' and 'AM/PM'  format           
    // Extract the parts of the time string
    let [time, modifier] = timeStr.split(' '); // 'hh:mm' and 'AM/PM'

    let [hours, minutes] = time.split(':');

    // Convert hours to 24-hour format
    if (hours === '12') {
        hours = modifier === 'AM' ? '00' : '12'; // Handle 12 AM and 12 PM
    } else if (modifier === 'PM') {
        hours = String(parseInt(hours, 10) + 12);
    }

    // Return the time in 24-hour format (hh:mm)
    return `${hours.padStart(2, '0')}:${minutes}`;
}

function compareTimes(startTime, endTime) {              //  function to compare start time and end time of the user input

    // Convert both times to 24-hour format
    const startTime_24 = convtTo24HourFormat(startTime);
    const endTime_24 = convtTo24HourFormat(endTime);


    // Compare the two times directly as strings or as Date objects
    if (startTime_24 > endTime_24) {
        return false;
    }
    return true

}

