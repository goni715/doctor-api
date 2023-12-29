const mongoose = require("mongoose");


const ApproveDoctorService = async (req, res, DoctorModel, UserModel) => {
    // Create Transaction Session
    const session = await mongoose.startSession();

   try{
       // Begin Transaction
       await session.startTransaction();

       const { doctorId, status } = req.body;
       const ObjectId = mongoose.Types.ObjectId;
       let UpdateQueryObject = {_id: new ObjectId(doctorId)};

       //data change
       let doctorUpdated = await DoctorModel.updateOne(UpdateQueryObject,{status:status}, {session});

       //data get
       let doctor = await DoctorModel.aggregate([{$match: {_id: new ObjectId(doctorId)}}]);
       let user = await UserModel.aggregate([{$match: {_id: new ObjectId(doctor[0].userId)}}]);

       const notification = user[0]['notification'];
       const newNotification ={
           type: "doctor-account-request-updated",
           message: `Your Doctor Account Request Has ${status} `,
           onClickPath: "/notification",
       };


       //data change
       let updatedUser = await UserModel.updateOne(
           {_id: new ObjectId(doctor[0].userId)},
           {
               notification:[newNotification, ...notification],
               isDoctor:true
           },
           {session}
       );

       // Transaction Success
       await session.commitTransaction();
       await session.endSession();

      res.status(200).json({message:"success", data:updatedUser});
   }
   catch(error){
       // Roll Back Transaction if Fail
       await session.abortTransaction();
       session.endSession();
       res.status(500).json({message:"error", data:error.toString()})
   }
}


module.exports=ApproveDoctorService