const UserCreateService = require("../../services/user/UserCreateService");
const UserModel = require("../../models/user/UserModel");
const UserLoginService = require("../../services/user/UserLoginService");

exports.Registration = async (req, res) =>{
    await UserCreateService(req,res,UserModel);
}

exports.Login = async (req, res) =>{
    await UserLoginService(req,res,UserModel);
}