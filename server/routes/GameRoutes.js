import express from 'express';
import {GetGameInfo,UpdateGames} from "../controllers/GameController.js";
import {authenticateToken} from "../middleware/Authenticate.js";

const router = express.Router();
//Retrieve
router.get("/:id",GetGameInfo);

// Update
router.post("/updategames",authenticateToken,UpdateGames);


export default router;