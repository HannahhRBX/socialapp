import mongoose, {Schema} from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        FirstName: {type: String, required: true, min: 2, max: 63},
        LastName: {type: String, required: true, min: 2, max: 63},
        Email: {type: String, required: true, unique: true, max: 60},
        Password: {type: String, required: true, min: 8, max: 30},
        ProfilePicture: {type: String, default: "default.png"},
        Bio: {type: String, default: "This user has no bio yet."},
        Discord: {type: String, default: ""},
        Games: {type: Array, default: []},
        Friends: {type: Array, default: []},
    }
);
const User = mongoose.model("User", UserSchema);
export default User;