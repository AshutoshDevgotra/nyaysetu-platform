import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
        select: false, // Don't return password by default
    },
    role: {
        type: String,
        enum: ["client", "advocate", "admin"],
        default: "client",
    },
    // Added fields to match existing login.tsx form if needed
    barRegistrationNumber: {
        type: String,
    },
    phone: {
        type: String,
    },
    // Advocate-specific details for search and profile
    experience: {
        type: String,
    },
    caseTypes: {
        type: String,
    },
    pricePerAppearance: {
        type: String,
    },
    court: {
        type: String,
    },
    state: {
        type: String,
    },
    image: {
        type: String,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    casesCount: {
        type: Number,
        default: 120,
    },
    // Reset password fields
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

// Prevent model recompilation check in development
export default mongoose.models.User || mongoose.model("User", UserSchema);
