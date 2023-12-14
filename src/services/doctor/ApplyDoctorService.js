const mongoose = require("mongoose");

const ApplyDoctorService = async (req, res, UserModel, DoctorModel) => {

  // Create Transaction Session
  const session = await mongoose.startSession();

  try{
    // Begin Transaction
    await session.startTransaction();

    const id = req.headers?.id;
    const PostBody = req.body;
    PostBody.userId=id;
    const ObjectId = mongoose.Types.ObjectId;

    //First-Database-Process//
    const newDoctor = await DoctorModel.create([PostBody], {session});

    const adminUser = await UserModel.findOne({ isAdmin: true });

    const newNotification = {
      type: "apply-doctor-request",
      message: `${newDoctor[0].firstName} ${newDoctor[0].lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor[0]._id,
        name: newDoctor[0].firstName + " " + newDoctor[0].lastName,
        onClickPath: "/admin/doctors",
       }
     }



      //Second Database process//data-change
    //UpdateAdmin
    const UpdateAdmin = await UserModel.updateOne(
        {_id: new ObjectId(adminUser?._id)},
        {$push: { notification: newNotification }},
        {session}
     )



      res.status(200).json({message:"success", result:newDoctor});
      // Transaction Success
      await session.commitTransaction();
      await session.endSession();
  }
  catch(e) {
     // Roll Back Transaction if Fail
     await session.abortTransaction();
     session.endSession();
     res.status(500).json({status: "fail", data: e.toString()})
  }
}

module.exports=ApplyDoctorService