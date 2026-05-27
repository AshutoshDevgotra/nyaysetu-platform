const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Manually parse .env.local
try {
  const envPath = path.join(__dirname, ".env.local");
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const parts = trimmed.split("=");
      const key = parts[0].trim();
      const val = parts.slice(1).join("=").trim();
      process.env[key] = val;
    }
  });
} catch (e) {
  console.error("Failed to read .env.local:", e.message);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI not found in environment or .env.local");
  process.exit(1);
}

// User schema definition
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  experience: String,
  caseTypes: String,
  court: String,
  state: String
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function check() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected.");

    const advocates = await User.find({ role: "advocate" });
    console.log(`Found ${advocates.length} advocates in the database.`);
    
    advocates.forEach((adv, i) => {
      console.log(`\nAdvocate #${i + 1}:`);
      console.log(`- ID: ${adv._id}`);
      console.log(`- Name: ${adv.name}`);
      console.log(`- Email: ${adv.email}`);
      console.log(`- Experience: ${adv.experience}`);
      console.log(`- Case Types: ${adv.caseTypes}`);
      console.log(`- Court: ${adv.court}`);
      console.log(`- State: ${adv.state}`);
    });

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected.");
  }
}

check();
