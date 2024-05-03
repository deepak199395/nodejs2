import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors"; // Assuming colors is for colorizing console output
import connectDB from "../Backend/Config/db.js";
import authRoutes from "../Backend/MVC/routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.get("/", (req, res) => {
    res.send({
        message: "Hello Deepak"
    });
});

app.use('/api/v1/user', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`.bgGreen.white);
});
