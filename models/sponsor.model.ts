import mongoose from "mongoose";

const SponsorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    }
});

export default mongoose.models.Sponsor || mongoose.model("Sponsor", SponsorSchema);
