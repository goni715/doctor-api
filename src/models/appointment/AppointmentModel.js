const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
    {
        userId: {//who will book for appointment
            type:mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "userId is required"],
        },
        doctorId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "doctors",
            required: [true, "doctorId is required"],
        },
        appointmentDate: {
            type: Date,
            required: [true, "date is required"],
        },
        status: {
            type: String,
            required: true,
            default: "pending",
            enum:["pending", "approved", "cancelled"]
        },
        time: {
            type: Date,//date&time
            required: [true, "time is required"],
        },
    },
    { timestamps: true, versionKey:false}
);

const AppointmentModel = mongoose.model("appointments", AppointmentSchema);

module.exports = AppointmentModel;
