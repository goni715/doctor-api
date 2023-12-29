const express =require('express');
const UserController = require("../controllers/user/UserController");
const AdminController = require("../controllers/admin/AdminController");

const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");


const router = express.Router();



router.get("/get-all-user", AuthVerifyMiddleware, AdminController.GetAllUser);
router.get("/get-all-doctor", AuthVerifyMiddleware, AdminController.GetAllDoctor);
router.get("/get-doctors-request", AuthVerifyMiddleware, AdminController.GetDoctorsRequest);

router.post("/approve-doctor", AuthVerifyMiddleware, AdminController.ApproveDoctor);




module.exports=router;

