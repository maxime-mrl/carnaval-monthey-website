import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true
    },
    right: {
        type: Number,
        default: 0
    },
});


export default mongoose.models.User || mongoose.model("User", UserSchema);
