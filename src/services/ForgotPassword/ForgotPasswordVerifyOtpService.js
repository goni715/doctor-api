const ForgotPasswordVerifyOtpService= async (req, res, OTPModel) => {
    try {
        let email = req.params.email;
        let OTPCode = req.params.otp;
        let status=0;
        let statusUpdate=1;

        //Database First Process
        let OTPCount = await OTPModel.aggregate([{$match: {email: email, otp: OTPCode, status: status}}])

        if (OTPCount.length>0) {
            // Second Process
            let OTPUpdate = await OTPModel.updateOne({email: email, otp: OTPCode, status: status}, {email: email, otp: OTPCode, status: statusUpdate})
            res.status(200).json({message: "success", result: OTPUpdate});
        }
        else {
            res.status(400).json({message: "fail", result: "InvalidOtpCode"});
        }
    }
    catch (error) {
        res.status(500).json({ message: "error", result:error.toString()});
    }
}
module.exports=ForgotPasswordVerifyOtpService