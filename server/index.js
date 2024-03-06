import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import {Register,Login} from "./controllers/UserController.js";
import {CreatePost} from "./controllers/PostController.js";
import helmet from "helmet";
import userRoutes from "./routes/UserRoutes.js";
import gameRoutes from "./routes/GameRoutes.js";
import postRoutes from "./routes/PostRoutes.js";
import {authenticateToken} from "./middleware/Authenticate.js";
//import loginRoute from "./routes/login.js";

/*Initialise the App*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(express.json());
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(morgan("common"));
app.use(cors());
app.use("/images",express.static(path.join(__dirname,"public/images")))


/* multer data uploader initialisation */
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, "public/images");
    },
    filename: function(req,file,cb) {
        cb(null,file.originalname);
    }
})
const upload = multer({storage: storage});

app.post("/post",authenticateToken,upload.single("Image"),CreatePost)
app.post("/Login",Login);
app.post("/Register",upload.single("ProfilePicture"),Register);
app.use("/users",userRoutes)
app.use("/games",gameRoutes)
app.use("/posts",postRoutes)

/* mongodb database initialisation */
const PORT = process.env.PORT || 5001;
const DB_URL = process.env.MONGO_DB || "";

mongoose.connect(process.env.MONGO_DB).then(()=>{
    app.listen(PORT,() => console.log(`Server listening on Port: ${PORT}`))
}).catch((error)=>console.log(`${error}: failed to connect.`))

