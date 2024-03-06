import express from 'express';
import {GetPosts,GetPost,GetAllPostsByUser,LikeUnlikePost,DeletePost} from "../controllers/PostController.js";
import {authenticateToken} from "../middleware/Authenticate.js";

const router = express.Router();

// Delete
router.delete("/:id/delete",authenticateToken,DeletePost);

// Update
router.patch("/:id/like",authenticateToken,LikeUnlikePost);

// Retrieve
router.get("/:id",authenticateToken,GetPost);
router.get("/",authenticateToken,GetPosts);
router.get("/:UserId",authenticateToken,GetAllPostsByUser);




export default router;