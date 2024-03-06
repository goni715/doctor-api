const UserModel = require("../../models/user/UserModel");
const AppointmentModel = require("../../models/appointment/AppointmentModel");
const mongoose = require("mongoose");

const UpdateAppointmentStatusService = async (req, res) => {
    // Create Transaction Session
    const session = await mongoose.startSession();


    try {

        // Begin Transaction
        await session.startTransaction();

        const { appointmentId, status } = req.body;
        const ObjectId = mongoose.Types.ObjectId;

        const appointment = await AppointmentModel.findByIdAndUpdate(
            {_id: new ObjectId(appointmentId)},
            { status },
            {session}
        );
        const user = await UserModel.findOne({ _id: new ObjectId(appointment.userId) });


        const notification = user['notification'];
        const newNotification ={
            type: "status-updated",
            message: `your appointment has been updated ${status}`,
            onCLickPath: "/doctor-appointments",
        };


        //data change
        let updatedUser = await UserModel.updateOne(
            {_id: new ObjectId(appointment.userId)},
            {
                notification:[newNotification, ...notification],
                isDoctor:true
            },
            {session}
        );

        // Transaction Success
        await session.commitTransaction();
        await session.endSession();
        res.status(200).json({message:"success", data:"Appointment Status Updated Successfully"});

    }catch(error){
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        await session.endSession();
        res.status(500).json({message: "error", data: error.toString()});
    }
}

module.exports=UpdateAppointmentStatusService