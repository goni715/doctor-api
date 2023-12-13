const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            min: 5,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isDoctor: {
            type: Boolean,
            default: false,
        },
        notification: {
            type: Array,
            default: [],
        },
        seenNotification: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true, versionKey:false},
);



const UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel

