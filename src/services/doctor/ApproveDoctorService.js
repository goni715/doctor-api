const mongoose = require("mongoose");


const ApproveDoctorService = async (req, res, DoctorModel, UserModel) => {
    // Create Transaction Session
    const session = await mongoose.startSession();

   try{
       // Begin Transaction
       await session.startTransaction();

       const {userId, doctorId } = req.body;
       const ObjectId = mongoose.Types.ObjectId;
       let UpdateQueryObject = {_id: new ObjectId(doctorId)};


       const user = await UserModel.findOne({_id: new ObjectId(userId), isDoctor:false});

       //if user is not already a doctor
       if(user){
           //data change
           let doctorUpdated = await DoctorModel.updateOne(UpdateQueryObject,{status:"approved"}, {session});

           const notification = user['notification'];
           const newNotification ={
               type: "doctor-account-request-updated",
               message: `Your Doctor Account Request Has approved `,
               onClickPath: "/notification",
           };


           //data change
           let updatedUser = await UserModel.updateOne(
               {_id: new ObjectId(userId)},
               {
                   notification:[newNotification, ...notification],
                   isDoctor:true
               },
               {session}
           );

           res.status(200).json({message:"success", data:updatedUser});
       }
       else{
           res.status(409).json({message:"success", data:"This user is already a doctor"});
       }

       // Transaction Success
       await session.commitTransaction();
       await session.endSession();

   }
   catch(error){
       // Roll Back Transaction if Fail
       await session.abortTransaction();
       await session.endSession();
       res.status(500).json({message:"error", data:error.toString()})
   }
}


module.exports=ApproveDoctorService