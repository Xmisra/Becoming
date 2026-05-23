import mongoose from "mongoose";

const versionSchema = new mongoose.Schema({

    journeyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Journey",
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    mood: {
        type: String,

        enum: [
            "happy",
            "sad",
            "motivated",
            "burned_out",
            "confused"
        ],

        default: "motivated",
    },

}, {
    timestamps: true,
});

const Version = mongoose.model(
    "Version",
    versionSchema
);

export default Version;