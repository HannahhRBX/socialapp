import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

// Function to create a new post
export const CreatePost = async(req,res)=>{
    try {

        // Getting uploaded file from request
        const UploadFile = req.file;
        var FileName = "";
        if (UploadFile){
            FileName = UploadFile.filename;
        }
        // Destructuring request body to get user id, body text, and image
        const {
            UserId,
            BodyText,
            Image,
        } = req.body;
        console.log(UserId,BodyText,Image,FileName)
        const user = await User.findById(UserId);
        // Creating new post with provided data
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
        // Send response with error message
        res.status(500).json({error: err.mesage});
    }
};

export const GetPosts = async(req,res) =>{
    try {
        const Posts = await Post.find();
        res.status(200).json(Posts);
    } catch(error) {
        // Send response with error message
        res.status(404).json({message: error.message})
    }
};

// Function to get a specific post
export const GetPost = async(req,res) =>{
    try {
        const {id} = req.params;
        const GetPost = await Post.findById(id);
        res.status(200).json(GetPost);
    } catch(error) {
        // Send response with error message
        res.status(404).json({message: error.message})
    }
};

// Function to get all posts by a specific user
export const GetAllPostsByUser = async(req,res) =>{
    try {
        const {id} = req.params;
        const Posts = await Post.find({UserId: id});
        res.status(200).json(Posts);
    } catch(error) {
        // Send response with error message
        res.status(404).json({message: error.message})
    }
};

// Function to like or unlike a post
export const LikeUnlikePost = async(req,res) =>{
    try {
        const {id} = req.params;
        const {UserId} = req.body;

        if (req.user.id == UserId){
        
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

        }else{
            res.status(400).json({message: "Unauthorized"})
        }
    } catch(error) {
        // Send response with error message
        res.status(404).json({message: error.message})
    }
};

// Function to delete a post
export const DeletePost = async(req,res) =>{
    try {

        const {id} = req.params;
        const GetPost = await Post.findById(id);
        if (req.user.id == GetPost.UserId){
            const deletedPost = await Post.findByIdAndDelete(id);
            const Posts = await Post.find();
            res.status(200).json(Posts);
        }else{
            res.status(400).json({message: "Unauthorized"})
        }
        
    } catch(error) {
        // Send response with error message
        res.status(404).json({message: error.message})
    }
};