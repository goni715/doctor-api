const mongoose = require("mongoose");
const GetDoctorByUserIdService = async (req, res, DoctorModel) => {
    try{
        let loginUserId = req.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {userId: new ObjectId(loginUserId), status: "approved"};

        let user = await DoctorModel.aggregate([
            {$match: QueryObject}
        ]);

        res.status(200).json({message: "success", data:user[0]})
    }
    catch(e){
        res.status(500).json({message: "error", data:e.toString()})
    }
}

module.exports = GetDoctorByUserIdService