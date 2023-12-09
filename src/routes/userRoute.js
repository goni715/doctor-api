const express =require('express');
const UserController = require("../controllers/user/UserController");


const router = express.Router();




router.post('/register',UserController.Registration);
router.post('/login',UserController.Login);

// router.get("/get-all-todos", TodoController.GetAllTodos);
// router.delete('/delete-todo/:id',TodoController.DeleteTodo);
// router.patch('/update-todo/:id',TodoController.UpdateTodo);
// router.get('/get-todo/:id',TodoController.GetTodo);
//




module.exports=router;

