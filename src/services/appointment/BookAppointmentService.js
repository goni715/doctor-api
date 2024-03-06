const AppointmentModel = require("../../models/appointment/AppointmentModel");
const UserModel = require("../../models/user/UserModel");
const mongoose = require("mongoose");
const DoctorModel = require("../../models/doctor/DoctorModel");
const moment = require("moment");

const BookAppointmentService = async (req, res) => {

    // Create Transaction Session
    const session = await mongoose.startSession();

    try{
        // Begin Transaction
        await session.startTransaction();

        let loginUserId = req.headers.id;
        const {doctorId, date, time} = req.body;
        const dateString = date.toString()

        // Given date and time in Bangladesh time zone
        //const date = new Date('2024-03-06T13:00:00+06:00');
        // Convert to ISO 8601 format
        //const isoDateString = date.toISOString();
       // console.log(isoDateString);
        //2024-03-06T07:00:00.000Z

        const Time = new Date(`${dateString}T${time}:00.000+06:00`);

       // Convert to ISO 8601 format
        const isoDateString = Time.toISOString();

        //console.log(isoDateString);
        //2024-03-06T07:00:00.000Z
        // Add UTC offset
        const isoDateStringWithOffset = isoDateString.replace('Z', '+00:00');
        //console.log(isoDateStringWithOffset);
        //2024-03-06T07:00:00.000+00:00


        const ObjectId = mongoose.Types.ObjectId;

        const PostBody = {
            doctorId:doctorId,
            userId:loginUserId, //who will book for appointment
            appointmentDate: new Date(date),
            time: new Date(isoDateStringWithOffset)
        }

        //First database-process/data-change
        const newAppointment = await AppointmentModel.create(
            [PostBody],
            {session});

        //find login-user//second-database-process
        const loginUser = await UserModel
            .findOne({_id: new ObjectId(loginUserId)});

        //third database-process
        const doctor = await DoctorModel
            .findOne({_id: new ObjectId(doctorId)});

        //find doctor-user//fourth-database-process
        const user = await UserModel
            .findOne({_id: new ObjectId(doctor.userId)});

        const notification = user['notification'];
        const newNotification ={
            type: "New-appointment-request",
            message: `A New Appointment Request from ${loginUser.name}`,
            onCLickPath: "/user/appointments",
        };


        //Update doctor-user notification //fifth database-process/data change
        let updatedUser = await UserModel.updateOne(
            {_id: new ObjectId(user._id)},
            {
                notification:[newNotification, ...notification]
            },
            {session}
        );


        // Transaction Success
        await session.commitTransaction();
        await session.endSession();

        res.status(200).json({message: "success", data: "Appointment Book successfully"});

    }
    catch(error){
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        await session.endSession();
        res.status(500).json({message: "error", data: error.toString()});
    }
}

module.exports=BookAppointmentService