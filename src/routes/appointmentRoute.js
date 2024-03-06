const express =require('express');
const AppointmentController = require("../controllers/appointment/AppointmentController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");


const router = express.Router();



router.post('/book-appointment', AuthVerifyMiddleware, AppointmentController.BookAppointment);
router.post('/check-booking-availability', AuthVerifyMiddleware, AppointmentController.CheckBookingAvailability);
router.get('/get-user-appointments', AuthVerifyMiddleware, AppointmentController.GetUserAppointments);
router.get('/get-doctor-appointments', AuthVerifyMiddleware, AppointmentController.GetDoctorAppointments);

router.post('/update-appointment-status', AuthVerifyMiddleware, AppointmentController.UpdateAppointmentStatus);




module.exports=router;

