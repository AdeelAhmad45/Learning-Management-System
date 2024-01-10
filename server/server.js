import app from "./app.js";
import connectionToDb from "./config/dbConnection.js";

const PORT = process.env.PORT || 8000

app.listen(PORT, async() => {
    await connectionToDb();
    console.log(`Server running at http://localhost${PORT}`);
})