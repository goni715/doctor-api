const BookAppointmentService = require("../../services/appointment/BookAppointmentService");
const CheckBookingAvailabilityService = require("../../services/appointment/CheckBookingAvailabilityService");
const GetUserAppointmentsService = require("../../services/appointment/GetUserAppointmentsService");
const GetDoctorAppointmentsService = require("../../services/appointment/GetDoctorAppointmentsService");
const UpdateAppointmentStatusService = require("../../services/appointment/UpdateAppointmentStatusService");


exports.BookAppointment = async (req, res) =>{
    await BookAppointmentService(req,res);
}

exports.CheckBookingAvailability = async (req, res) =>{
    await CheckBookingAvailabilityService(req,res);
}

exports.GetUserAppointments = async (req, res) =>{
    await GetUserAppointmentsService(req,res);
}

exports.GetDoctorAppointments = async (req, res) =>{
    await GetDoctorAppointmentsService(req,res);
}

exports.UpdateAppointmentStatus = async (req, res) =>{
    await UpdateAppointmentStatusService(req,res);
}