import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(400).json({
        message: "Email already exists, please login instead",
      });
    }

    //lets hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create and save user to the database
    const newUser = await User.create({
      name,
      email,
      phoneNumber,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user is an existing user
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Email not found, please register",
      });
    }
    //check if the password is correct
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Your email or password is not correct",
      });
    }

    if (validPassword) {
      //generate token
      const token = createToken(res, existingUser._id);
      res.status(200).json({
        message: "User logged in successfully",
        data: existingUser,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};


export const getAllUsers =async (req, res)=> {
    try{
        const users = await User.find({})
        res.status(200).json({
            message: "Users fetched successfully",
            users
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"something went wrong"
        })
    }
}

export const logoutUser = async(req, res) => {
    try{
        res.cookie("jwt", "",{
            httpOnly:true,
            expires:new Date(0)
        });

        res.status(200).json({
            message:"User logged out successfully"
        })

    }catch(error){
        console.log(error)
    }
}