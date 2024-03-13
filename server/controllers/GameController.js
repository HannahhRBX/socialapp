import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Updates games for a user
export const UpdateGames = async(req,res)=>{
    try {
        const {
            id,
            Game1,
            Game2,
            Game3,
            Game4,
            Game5
        } = req.body;

        if (req.user.id == id){
        
            const user = await User.findById(id);
            const games = [Game1,Game2,Game3,Game4,Game5];
            console.log(games)
            user.Games = games;
            const updateData = await user.save();
            res.status(200).json(updateData);
        }else{
            res.status(400).json({message: "Unauthorized"})
        }
    }catch(err){
        res.status(404).json({error: err.mesage});
    }
};
// Gets game info for all users
export const GetGameInfo = async(req,res) =>{
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch(error) {
        // Handle error
        res.status(404).json({message: error.message})
    }
};