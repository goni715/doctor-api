const AppointmentModel = require("../../models/appointment/AppointmentModel");
const mongoose = require("mongoose");
const GetUserAppointmentsService = async (req, res) => {
    try {
        let loginUserId = req.headers.id;
        const ObjectId = mongoose.Types.ObjectId;

        const appointments = await AppointmentModel.aggregate([
            {$match: {userId: new ObjectId(loginUserId)}},
            {$lookup: {from: "doctors", localField:"doctorId", foreignField: "_id", as: "doctor"}}
        ]);


        res.status(200).json({message: "success", data: appointments});
    }
    catch(error) {
        res.status(500).json({message: "error", data: error.toString()});
    }
}

module.exports=GetUserAppointmentsService