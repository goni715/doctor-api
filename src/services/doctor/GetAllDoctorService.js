const mongoose = require("mongoose");
const GetAllDoctorService = async (req, res, DoctorModel) => {
   try{
      const ObjectId = mongoose.Types.ObjectId;
      let doctors = await DoctorModel.aggregate([{$match: {status: "approved"}}]);
      res.status(200).json({message:"success", data:doctors});
   }
   catch(error){
      res.status(500).json({message:"error", data:error.toString()})
   }
}

module.exports=GetAllDoctorService