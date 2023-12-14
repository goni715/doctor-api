const UserCreateService = require("../../services/user/UserCreateService");
const UserModel = require("../../models/user/UserModel");
const DoctorModel = require("../../models/doctor/DoctorModel");
const UserLoginService = require("../../services/user/UserLoginService");
const ApplyDoctorService = require("../../services/doctor/ApplyDoctorService");

exports.Registration = async (req, res) =>{
    await UserCreateService(req,res,UserModel);
}

exports.Login = async (req, res) =>{
    await UserLoginService(req,res,UserModel);
}

exports.ApplyDoctor = async (req, res) =>{
    await ApplyDoctorService(req,res,UserModel, DoctorModel);
}