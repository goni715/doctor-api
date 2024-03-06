const DoctorModel = require("../../models/doctor/DoctorModel");
const GetDoctorByIdService = require("../../services/doctor/GetDoctorByIdService");
const GetDoctorByUserIdService = require("../../services/doctor/GetDoctorByUserIdService");
const GetDoctorsForUserService = require("../../services/doctor/GetDoctorsForUserService");
const ApproveDoctorService = require("../../services/doctor/ApproveDoctorService");
const UserModel = require("../../models/user/UserModel");
const GetAllDoctorService = require("../../services/doctor/GetAllDoctorService");
const GetDoctorsRequestService = require("../../services/doctor/GetDoctorsRequestService");
const DeleteService = require("../../services/common/DeleteService");
const UpdateService = require("../../services/common/UpdateService");


exports.ApproveDoctor=async(req,res)=>{
    await ApproveDoctorService(req,res,DoctorModel,UserModel);
}

exports.GetAllDoctor=async(req,res)=>{
    await GetAllDoctorService(req,res,DoctorModel)
}

exports.GetDoctorsRequest=async(req,res)=>{
    await GetDoctorsRequestService(req,res,DoctorModel)
}

exports.RemoveDocRequest=async(req,res)=>{
    await DeleteService(req,res,DoctorModel)
}

exports.GetDoctorById = async (req, res) =>{
    await GetDoctorByIdService(req,res, DoctorModel);
}

exports.GetDoctorByUserId=async(req,res)=>{
    await GetDoctorByUserIdService(req,res,DoctorModel);
}

exports.GetDoctorsForUser=async(req,res)=>{
    await GetDoctorsForUserService(req,res,DoctorModel);
}

exports.UpdateDoctor=async(req,res)=>{
    await UpdateService(req,res,DoctorModel);
}
