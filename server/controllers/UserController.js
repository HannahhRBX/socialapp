import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Function to create a new user
export const Register = async(req,res)=>{
    
    try {
        console.log(req.body)
        const UploadFile = req.file;
        var FileName = "default.png";
        if (UploadFile){
            FileName = UploadFile.filename;
        }
        
        const {
            FirstName,
            LastName,
            Email,
            Discord,
            Password,
            ConfirmPassword,
            ProfilePicture
        } = req.body;
        
        const Hash = await bcrypt.genSalt();
        const PasswordHash = await bcrypt.hash(Password,Hash);
        const NewUser = new User({
            FirstName,
            LastName,
            Email,
            Password: PasswordHash,
            ProfilePicture: FileName,
            
            Discord,
            
        });
        console.log("Sdasd")
        const user = await NewUser.save();
        console.log("Hi")
        const token = jwt.sign({id: user._id}, process.env.PUBLIC_KEY);
        console.log("s",token)
        res.status(201).json({token,user});
    }catch(err){
        res.status(500).json({error: err.mesage});
    }
};

// Function to login user and pass token
export const Login = async(req,res) =>{
    try {
        console.log(req.body);
        const {email,password} = req.body;
        const user = await User.findOne({Email: email});
        if (!user){
            return res.status(400).json({message: "Invalid email or password."})
        }
        const isMatch = await bcrypt.compare(password,user.Password);
        if (!isMatch){
            return res.status(400).json({message: "Invalid email or password."})
        }
        const token = jwt.sign({id: user._id}, process.env.PUBLIC_KEY);
        console.log(token)
        delete user.Password;
        res.status(200).json({token,user});
    }catch(error){
        res.status(404).json({message: error.message})
    }
};

// Function to update user data
export const UpdateProfile = async (req, res) => {
    try {
        const { 
            id,
            ProfilePicture,
            FirstName,
            LastName,
            Bio,
            Discord
        } = req.body;
        const updateData = req.body;
        console.log(req.file)
        if (req.file) {
            updateData.ProfilePicture = req.file.filename; // or req.file.filename, depending on your setup
        }else{
            delete updateData.ProfilePicture;
        }
        //console.log(updateData.ProfilePicture)
        console.log(req.body);
        for (let key in updateData) {
            if ( updateData[key] === null || Object.keys(updateData[key]).length === 0 || key === "id") {
                delete updateData[key];
            }
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({msg: "Invalid user."})
        }
        // Make sure user cannot update their id
        const UpdatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        
        res.status(200).json(UpdatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update user data
export const UpdatePassword = async (req, res) => {
    try {
        
        const {
            id,
            CurrentPassword,
            NewPassword,
            ConfirmPassword
        } = req.body;
        
        const user = await User.findById(id);
        if (!user){
            return res.status(400).json({msg: "Invalid user."})
        }
        
        
        
        if (req.user.id == id){
            if (NewPassword != ConfirmPassword){
                return res.status(400).json({message: "Passwords do not match."});
            }
            const isMatch = await bcrypt.compare(CurrentPassword,user.Password);
            if (!isMatch){
                
                return res.status(400).json({message: "Current password is invalid."})
            }

            const Hash = await bcrypt.genSalt();
            const PasswordHash = await bcrypt.hash(NewPassword,Hash);
            const UpdatedUser = await User.findByIdAndUpdate(id, {Password: PasswordHash}, { new: true });
            
            
            res.status(200).json(UpdatedUser);
        }else{
            
            res.status(400).json({message: "Unauthorized"})
        }
    }catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Function to get all users
export const GetUsers = async(req,res) =>{
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
};

// Function to get all friends by specific user
export const GetAllFriendsByUser = async (req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    const friends = await user.Friends;
    res.status(200).json(friends);
}

// Function to get all games by specific user
export const GetAllGamesByUser = async (req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    const games = await user.Games;
    res.status(200).json(games);
}

// Function to remove value from array
function RemoveFromArray(Arr,Value){
    const index = Arr.indexOf(Value);
    if (index>-1){
        Arr.splice(index,1);
    }
    return Arr
};

// Function to add or remove friend
export const addRemoveFriend = async(req,res)=>{
    try {
        const {id,FriendId} = req.params;
        if (req.user.id == id){
            const user = await User.findById(id);
            const friend = await User.findById(FriendId);
            
            if (user.Friends.includes(FriendId)){
                
                user.Friends = RemoveFromArray(user.Friends,FriendId);
                friend.Friends = RemoveFromArray(friend.Friends,id);
            }else{
                user.Friends.push(FriendId);
                friend.Friends.push(id);
            }
            await user.save();
            await friend.save();
            console.log(user)
            console.log(friend)
            res.status(200).json(user.Friends);
        }else{
            res.status(400).json({message: "Unauthorized"})
        }

    }catch(error){
        res.status(404).json({message: error.message});
    }
};