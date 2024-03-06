const DoctorModel = require("../../models/doctor/DoctorModel");
const AppointmentModel = require("../../models/appointment/AppointmentModel");
const mongoose = require("mongoose");
const GetDoctorAppointmentsService = async (req, res) => {
    try {
        let loginUserId = req.headers.id;
        const ObjectId = mongoose.Types.ObjectId;

        const doctor = await DoctorModel.findOne({ userId: new ObjectId(loginUserId) });

        const appointments = await AppointmentModel.aggregate([
            {$match: {doctorId: new ObjectId(doctor._id)}},
            {$lookup: {from: "users", localField:"userId", foreignField: "_id", as: "user"}}
        ]);

        res.status(200).json({message: "success", data: appointments});
    }
    catch(error) {
        res.status(500).json({message: "error", data: error.toString()});
    }
}

module.exports=GetDoctorAppointmentsService