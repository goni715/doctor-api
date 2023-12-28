const mongoose = require("mongoose");
const DeleteAllNotificationService = async (req, res, UserModel) => {
    try{
        let id=req.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(id)};

        let updatedUser = await UserModel.updateOne(
            QueryObject,
            {
                seenNotification:[],
                notification:[]
            }
        );

        res.status(200).json({message:"success", result:"Notifications Deleted successfully", data:updatedUser})
    }
    catch(e){
        res.status(500).json({message:"error", data:error.toString()})
    }
}

module.exports = DeleteAllNotificationService