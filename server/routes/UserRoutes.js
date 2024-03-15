import express from 'express';
import {GetUsers,GetAllFriendsByUser,GetAllGamesByUser,addRemoveFriend} from "../controllers/UserController.js";
import {GetAllPostsByUser} from "../controllers/PostController.js";
import {authenticateToken} from "../middleware/Authenticate.js";

const router = express.Router();
//Retrieve
router.get("/:id/friends",authenticateToken,GetAllFriendsByUser);
router.get("/:id/games",GetAllGamesByUser);
router.get("/:id/posts",authenticateToken,GetAllPostsByUser);
// Update
router.patch("/:id/addfriend/:FriendId",authenticateToken,addRemoveFriend);


export default router;