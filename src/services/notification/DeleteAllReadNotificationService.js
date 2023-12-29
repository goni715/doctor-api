const mongoose = require("mongoose");
const DeleteAllReadNotificationService = async (req, res, UserModel) => {
    try{
        let id=req.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(id)};

        let updatedUser = await UserModel.updateOne(
            QueryObject,
            {
                seenNotification:[]
            }
        );

        res.status(200).json({message:"success", result:"Notifications Deleted successfully", data:updatedUser})
    }
    catch(error){
        res.status(500).json({message:"error", data:error.toString()})
    }
}

module.exports = DeleteAllReadNotificationService