const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
    {
        userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        firstName: {
            type: String,
            required: [true, "first name is required"],
            minLength:3,
            maxLength:31,
            trim:true
        },
        lastName: {
            type: String,
            required: [true, "last name is required"],
            minLength:3,
            maxLength:31,
            trim:true
        },
        phone: {
            type: String,
            required: [true, "phone no is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        website: {
            type: String,
            default: "https://osman-goni.netlify.app/"
        },
        address: {
            type: String,
            required: [true, "address is required"],
        },
        specialization: {
            type: String,
            required: [true, "specialization is require"],
        },
        experience: {
            type: String,
            required: [true, "experience is required"],
        },
        feesPerConsultation: {
            type: Number,
            required: [true, "fee is required"],
        },
        status: {
            type: String,
            default: "pending",
            enum:["pending", "approved"]
        },
        timings: {
            type: Object,
            required: [true, "work timing is required"],
        },
    },
    { timestamps: true }
);

const DoctorModel = mongoose.model("doctors", DoctorSchema);
module.exports = DoctorModel;
