const OTPModel = require("../../models/user/OTPModel");
const SendEmailUtility = require("../../utility/SendEmailUtility");

const ForgotPasswordVerifyEmailService = async (req, res, UserModel) => {
    try {
        // Email Account Query
        let email = req.body['email'];
        let OTPCode = Math.floor(100000 + Math.random() * 900000)

        // Database First process
        let existingEmail = await UserModel.aggregate([{$match: {email: email}}])

        if(existingEmail.length>0){
            // OTP Insert
            // Database Second process
            await OTPModel.create({email: email, otp: OTPCode})

            // Email Send
            let SendEmail = await SendEmailUtility(email,"Your PIN Code is= "+OTPCode,"Exchange-App PIN Verification")
            res.status(200).json({message: "success", result:SendEmail});
        }
        else{
            res.status(404).json({message: "fail", result:"Could not Find this Email!"});
        }
    }
    catch (error) {
        res.status(500).json({ message: "error", result:error.toString()});
    }
}
module.exports=ForgotPasswordVerifyEmailService