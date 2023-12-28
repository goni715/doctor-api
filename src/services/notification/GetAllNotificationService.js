const mongoose = require("mongoose");
const GetAllNotificationService = async (req, res, UserModel) => {
    try{
        let id=req.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(id)};
        let user = await UserModel.aggregate([{$match: QueryObject}]);

        const seenNotification = user[0]['seenNotification'];
        const notification = user[0]['notification'];
        let updatedUser = await UserModel.updateOne(
            QueryObject,
            {
                seenNotification:[...notification, ...seenNotification],
                notification:[]
            }
        );

        res.status(200).json({message:"success", result:"all notification marked as read", data:updatedUser})
    }
    catch(error){
        res.status(500).json({message:"error", data:error.toString()})
    }

}

module.exports= GetAllNotificationService