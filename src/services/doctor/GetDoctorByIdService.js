const mongoose = require("mongoose");
const GetDoctorByIdService = async (req, res, DoctorModel) => {
    try {

        let id=req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(id)};

        let data = await DoctorModel.findOne(QueryObject);

        res.status(200).json({message: "success", data: data});

    } catch (error) {
        res.status(500).json({message: "error", data: error.toString()});
    }
}
module.exports=GetDoctorByIdService