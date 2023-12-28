const mongoose = require("mongoose");
const GetMyProfileService = async (req, res, UserModel) => {
  try{
      let id = req.headers.id;
      const ObjectId = mongoose.Types.ObjectId;
      let QueryObject = {_id: new ObjectId(id)};

      let user = await UserModel.aggregate([
          {$match: QueryObject}
      ]);

      res.status(200).json({message: "success", data:user[0]})
  }
  catch(e){
      res.status(500).json({message: "error", data:e.toString()})
  }
}

module.exports = GetMyProfileService