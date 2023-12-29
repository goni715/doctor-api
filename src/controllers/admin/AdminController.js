const UserModel = require("../../models/user/UserModel");
const DoctorModel = require("../../models/doctor/DoctorModel");
const ApproveDoctorService = require("../../services/doctor/ApproveDoctorService");
const GetAllDoctorService = require("../../services/doctor/GetAllDoctorService");
const GetDoctorsRequestService = require("../../services/doctor/GetDoctorsRequestService");
const GetAllService = require("../../services/common/GetAllService");

exports.GetAllUser=async(req,res)=>{
    const projection = {$project: {_id:1, email:1, name:1, isDoctor:1}}
    await GetAllService(req,res,UserModel, projection)
}


exports.ApproveDoctor=async(req,res)=>{
    await ApproveDoctorService(req,res,DoctorModel,UserModel);
}

exports.GetAllDoctor=async(req,res)=>{
    await GetAllDoctorService(req,res,DoctorModel)
}

exports.GetDoctorsRequest=async(req,res)=>{
    await GetDoctorsRequestService(req,res,DoctorModel)
}


