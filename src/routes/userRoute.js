const express =require('express');
const UserController = require("../controllers/user/UserController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");


const router = express.Router();




router.post('/register',UserController.Registration);
router.post('/login',UserController.Login);

//APply Doctor || POST
router.post("/apply-doctor", AuthVerifyMiddleware, UserController.ApplyDoctor);

router.get("/get-all-user", AuthVerifyMiddleware, UserController.GetAllUser);
// router.delete('/delete-todo/:id',TodoController.DeleteTodo);
// router.patch('/update-todo/:id',TodoController.UpdateTodo);
// router.get('/get-todo/:id',TodoController.GetTodo);
//




module.exports=router;

