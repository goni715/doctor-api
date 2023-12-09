const express =require('express');
const TodoController = require("../controllers/TodoController");


const router = express.Router();




router.post('/create-todo',TodoController.CreateTodo);
router.get("/get-all-todos", TodoController.GetAllTodos);
router.delete('/delete-todo/:id',TodoController.DeleteTodo);
router.patch('/update-todo/:id',TodoController.UpdateTodo);
router.get('/get-todo/:id',TodoController.GetTodo);





module.exports=router;

