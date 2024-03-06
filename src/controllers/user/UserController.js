const UserCreateService = require("../../services/user/UserCreateService");
const UserModel = require("../../models/user/UserModel");
const DoctorModel = require("../../models/doctor/DoctorModel");
const UserLoginService = require("../../services/user/UserLoginService");
const ApplyDoctorService = require("../../services/doctor/ApplyDoctorService");
const GetAllService = require("../../services/common/GetAllService");
const MarkAllReadNotificationService = require("../../services/notification/MarkAllReadNotificationService");
const GetMyProfileService = require("../../services/user/GetMyProfileService");
const DeleteAllNotificationService = require("../../services/notification/DeleteAllReadNotificationService");

exports.Registration = async (req, res) =>{
    await UserCreateService(req,res,UserModel);
}

exports.Login = async (req, res) =>{
    await UserLoginService(req,res,UserModel);
}

exports.ApplyDoctor = async (req, res) =>{
    await ApplyDoctorService(req,res,UserModel, DoctorModel);
}


exports.GetMyProfile=async(req,res)=>{
    await GetMyProfileService(req,res,UserModel);
}

exports.MarkAllReadNotification=async(req,res)=>{
    await MarkAllReadNotificationService(req,res,UserModel);
}

exports.DeleteAllReadNotification=async(req,res)=>{
    await DeleteAllNotificationService(req,res,UserModel);
}

exports.GetAllUser=async(req,res)=>{
    const projection = {$project: {_id:1, email:1, name:1, isDoctor:1}}
    await GetAllService(req,res,UserModel, projection)
}

