const hashedPassword = require("../../utility/hashedPassword");

const CreateNewPasswordService= async (req, res,UserModel,OTPModel) => {
    let email = req.body['email'];
    let OTPCode = req.body['otp'];
    let NewPass =  req.body['password'];
    let statusUpdate=1;

    try {
        // Database First Process
          let OTPUsedCount = await OTPModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}]);

          if(OTPUsedCount.length > 0){
             const hashedPass = await hashedPassword(NewPass);
            // Database Second Process
            let PasswordUpdate = await UserModel.updateOne({email: email},{password: hashedPass})
            res.status(200).json({message: "success", result: PasswordUpdate});
          }
          else{
              res.status(400).json({message: "fail", result: "InvalidOtpCode"});
          }
    }
    catch(error) {
        res.status(500).json({ message: "error", result:error.toString()});
    }
}
module.exports=CreateNewPasswordService