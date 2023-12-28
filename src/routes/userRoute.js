const express =require('express');
const UserController = require("../controllers/user/UserController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");


const router = express.Router();




router.post('/register',UserController.Registration);
router.post('/login',UserController.Login);

//APply Doctor || POST
router.post("/apply-doctor", AuthVerifyMiddleware, UserController.ApplyDoctor);

router.get("/get-all-user", AuthVerifyMiddleware, UserController.GetAllUser);
router.get("/get-my-profile", AuthVerifyMiddleware, UserController.GetMyProfile);


router.put("/get-all-notification", AuthVerifyMiddleware, UserController.GetAllNotification);
router.put("/delete-all-notification", AuthVerifyMiddleware, UserController.DeleteAllNotification);





module.exports=router;

