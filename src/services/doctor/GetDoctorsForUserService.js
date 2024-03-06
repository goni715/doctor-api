const mongoose = require("mongoose");
const GetDoctorsForUserService = async (req, res, DoctorModel) => {
    try{
        let loginUserId = req.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let doctors = await DoctorModel.aggregate([{$match: {status: "approved", userId:{$ne: new ObjectId(loginUserId)}}}]);
        res.status(200).json({message:"success", data:doctors});
    }
    catch(error){
        res.status(500).json({message:"error", data:error.toString()})
    }
}

module.exports=GetDoctorsForUserService