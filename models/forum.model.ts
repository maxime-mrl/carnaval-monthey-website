import mongoose from "mongoose";

const ForumSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: true,
    }
});

export default mongoose.models.Forum || mongoose.model("Forum", ForumSchema);
