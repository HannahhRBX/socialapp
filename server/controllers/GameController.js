import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
        const user = await User.findById(id);
        const games = [Game1,Game2,Game3,Game4,Game5];
        console.log(games)
        user.Games = games;
        const updateData = await user.save();
        res.status(200).json(updateData);
    }catch(err){
        res.status(404).json({error: err.mesage});
    }
};

export const GetGameInfo = async(req,res) =>{
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
};