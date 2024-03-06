const express =require('express');
const DoctorController = require("../controllers/doctor/DoctorController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");

const router = express.Router();

router.get('/get-doctor/:id', AuthVerifyMiddleware, DoctorController.GetDoctorById);
router.get('/get-doctor-by-user-id', AuthVerifyMiddleware, DoctorController.GetDoctorByUserId);
router.get('/get-doctors-for-user', AuthVerifyMiddleware, DoctorController.GetDoctorsForUser);
router.put('/update-doctor/:id', AuthVerifyMiddleware, DoctorController.UpdateDoctor);

//admin
router.get("/get-all-doctor", AuthVerifyMiddleware, DoctorController.GetAllDoctor);
router.get("/get-doctors-request", AuthVerifyMiddleware, DoctorController.GetDoctorsRequest);
router.delete("/remove-doc-request/:id", AuthVerifyMiddleware, DoctorController.RemoveDocRequest);
router.post("/approve-doctor", AuthVerifyMiddleware, DoctorController.ApproveDoctor);


module.exports=router;

