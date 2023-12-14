
const GetAllService= async (req,res,DataModel, Projection) => {
    try {
        let  data =await DataModel.aggregate([
            Projection
          ]);
        res.status(200).json({message: "success", result: data});
    }
    catch (error){
        res.status(500).json({message: "fail", result: error.toString()});
    }
}
module.exports=GetAllService