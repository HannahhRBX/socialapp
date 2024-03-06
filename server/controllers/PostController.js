import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

export const CreatePost = async(req,res)=>{
    try {
        const UploadFile = req.file;
        var FileName = "";
        if (UploadFile){
            FileName = UploadFile.filename;
        }
        const {
            UserId,
            BodyText,
            Image,
        } = req.body;
        console.log(UserId,BodyText,Image,FileName)
        const user = await User.findById(UserId);
        const NewPost = new Post({
            UserId,
            BodyText,
            Image: FileName,
            Comments: [],
            Likes: {}
        });
        await NewPost.save();
        const GetPosts = await Post.find();
        res.status(200).json(GetPosts);
    }catch(err){
        res.status(500).json({error: err.mesage});
    }
};

export const GetPosts = async(req,res) =>{
    try {
        const Posts = await Post.find();
        res.status(200).json(Posts);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
};

export const GetPost = async(req,res) =>{
    try {
        const {id} = req.params;
        const GetPost = await Post.findById(id);
        res.status(200).json(GetPost);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
};

export const GetAllPostsByUser = async(req,res) =>{
    try {
        const {UserId} = req.params;
        const Posts = await Post.find({UserId});
        res.status(200).json(Posts);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
};

export const LikeUnlikePost = async(req,res) =>{
    try {
        const {id} = req.params;
        const {UserId} = req.body;
        const GetPost = await Post.findById(id);
        const FindLike = GetPost.Likes.get(UserId);
        if (FindLike){
            GetPost.Likes.delete(UserId);
        }else{
            GetPost.Likes.set(UserId,true)
        }
        const UpdatePost = await Post.findByIdAndUpdate(
            id,{Likes: GetPost.Likes},{new:true}
        );
        res.status(200).json(UpdatePost);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
};

export const DeletePost = async(req,res) =>{
    try {
        const {id} = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        const Posts = await Post.find();
        res.status(200).json(Posts);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
};