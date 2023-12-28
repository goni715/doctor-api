const mongoose = require("mongoose");
const hashedPassword = require("../../utility/hashedPassword");

const ResetPasswordService= async (req, res, UserModel,ResetTokenModel) => {

    // Create Transaction Session
    const session = await mongoose.startSession();

    try {
        let Token = req.body['token'];
        let Email = req.body['email'];
        let NewPassword =  req.body['newPassword'];
        let status=0;
        let statusUpdate=1;


        //Database First Process
        let TokenUsedCount = await ResetTokenModel.aggregate([
            {$match: {email:Email, token: Token, status: status, tokenExpires: {$gt: new Date(Date.now()) } }}
        ]);



        if (TokenUsedCount.length>0) {

            // Begin Transaction
            await session.startTransaction();

            // Second Database Process//Data Change
            let TokenUpdate = await ResetTokenModel.updateOne({email:Email, token: Token, status: status}, {email:Email, token: Token, status: statusUpdate}, {session})


            const hashedPass = await hashedPassword(NewPassword);
            //Third Database Process//Data Change
            let PasswordUpdate = await UserModel.updateOne({email: Email},{password: hashedPass}, {session})

            // Transaction Success
            await session.commitTransaction();
            await session.endSession();

            res.status(200).json({message: "success", result:PasswordUpdate});

        } else {
            await session.endSession();
            res.status(400).json({message: "fail", result: "InvalidLink"});
        }
    }
    catch (error) {
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        await session.endSession();
        res.status(500).json({ message: "error", result:error.toString()});
    }
}
module.exports=ResetPasswordService