const UserCreateService = require("../../services/user/UserCreateService");
const UserModel = require("../../models/user/UserModel");
const DoctorModel = require("../../models/doctor/DoctorModel");
const UserLoginService = require("../../services/user/UserLoginService");
const ApplyDoctorService = require("../../services/doctor/ApplyDoctorService");
const GetAllService = require("../../services/common/GetAllService");
const TodoModel = require("../../models/TodoModel");
const GetAllNotificationService = require("../../services/notification/GetAllNotificationService");
const GetMyProfileService = require("../../services/user/GetMyProfileService");
const DeleteAllNotificationService = require("../../services/notification/DeleteAllNotificationService");

exports.Registration = async (req, res) =>{
    await UserCreateService(req,res,UserModel);
}

exports.Login = async (req, res) =>{
    await UserLoginService(req,res,UserModel);
}

exports.ApplyDoctor = async (req, res) =>{
    await ApplyDoctorService(req,res,UserModel, DoctorModel);
}

exports.GetAllUser=async(req,res)=>{
    const projection = {$project: {_id:1, email:1, name:1, isDoctor:1}}
    await GetAllService(req,res,UserModel, projection)
}

exports.GetMyProfile=async(req,res)=>{
    await GetMyProfileService(req,res,UserModel);
}


exports.GetAllNotification=async(req,res)=>{
    await GetAllNotificationService(req,res,UserModel);
}

exports.DeleteAllNotification=async(req,res)=>{
    await DeleteAllNotificationService(req,res,UserModel);
}
