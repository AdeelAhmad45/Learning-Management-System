import app from "./app.js";
import connectionToDb from "./config/dbConnection.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";

// Cloudinary configuration
cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

const PORT = process.env.PORT || 8000

app.listen(PORT, async() => {
    await connectionToDb();
    console.log(`Server running at http://localhost${PORT}`);
})