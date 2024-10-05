import express from "express";
import eventRoutes from "./routes/event.route.js";
import cors from 'cors';
import { connectDB } from "./config/db.js";

const app = express();
const PORT = 5000;

app.use(cors())   // allows client  applications to interact with resources in a different domain
app.use(express.json({ limit: "10mb" })); // will allow us to parse req.body
app.use("/api/v1/event", eventRoutes);
app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
    connectDB();
});