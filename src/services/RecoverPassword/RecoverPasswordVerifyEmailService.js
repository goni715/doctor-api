const ResetTokenModel = require("../../models/user/ResetTokenModel");
const SendEmailUtilityTwo = require("../../utility/SendEmailUtilityTwo");
const crypto = require("crypto");


const RecoverPasswordVerifyEmailService = async (req, res, UserModel) => {
    try {
        // Email Account Query
        let email = req.body['email'];
        const Token = crypto.randomBytes(32).toString("hex");


        // Database First process
        let UserCount = (await UserModel.aggregate([{$match: {email: email}}]))

        if(UserCount.length>0){
            // Token Insert
            // Database Second process
            await ResetTokenModel.create({email: email, token:Token})

            const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5173/reset-password/${email}/${Token}'>Click Here</>`;

            // Email Send
            let SendEmail = await SendEmailUtilityTwo(email,"Hey User","Exchange MERN", resetURL)

            res.status(200).json({message: "success", result:SendEmail});
        }
        else{
            res.status(404).json({message: "fail", result:"Could not Find this Email!"});
        }
    }catch (error) {

        res.status(500).json({ message: "error", result:error.toString()});
    }
}
module.exports=RecoverPasswordVerifyEmailService