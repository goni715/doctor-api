const express =require('express');
const UserController = require("../controllers/user/UserController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");


const router = express.Router();




router.post('/register',UserController.Registration);
router.post('/login',UserController.Login);

//APply Doctor || POST
router.post("/apply-doctor", AuthVerifyMiddleware, UserController.ApplyDoctor);
router.get("/get-my-profile", AuthVerifyMiddleware, UserController.GetMyProfile);
router.get("/get-doctor-profile", AuthVerifyMiddleware, UserController.GetDoctorProfile);

router.put("/mark-all-read-notification", AuthVerifyMiddleware, UserController.MarkAllReadNotification);
router.put("/delete-all-read-notification", AuthVerifyMiddleware, UserController.DeleteAllReadNotification);





module.exports=router;

