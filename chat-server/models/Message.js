import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    room: {type: String, required: true, index: true},
    username: {type: String, required: true},
    text: {type: String, required: true},
}, {timestamps: true});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);