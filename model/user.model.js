import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:"Please enter a valid email"
        }
    
    },
    phoneNumber:{
        type:Number,

    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(value);
                // REGEX EXPRESSION
            },
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long."
        }
    },
    isAdmin:{
        type:String,
        default:"user"
    }
})


const User = mongoose.model("User", userSchema)

export default User;

