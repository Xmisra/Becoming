import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path"

import connection from "./connection/db.connect.js";

import userRouter from "./routes/user.routes.js";
import journeyRoute from "./routes/journey.routes.js";
import versionRoute from "./routes/version.routes.js";

dotenv.config();

const app = express();

// environment variables
const PORT = process.env.PORT || 8003;
const MONGO_URI = process.env.MONGODB_URI;

// database connection
connection(MONGO_URI);

// middlewares
app.use((req, res, next) => {
    const allowedOrigins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", "true");
    }

    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());

app.use(express.urlencoded({
    extended: false,
}));

app.use(cookieParser());

app.use("/uploads",express.static(path.resolve("uploads")));

// routes
app.use("/users", userRouter);

app.use("/journey", journeyRoute);

app.use("/version", versionRoute);

app.use((err, req, res, next) => {
    if (err) {
        return res.status(400).json({
            error: err.message || "File upload failed",
        });
    }

    next();
});

// test route
app.get("/", (req, res) => {

    return res.json({
        message: "Server is running successfully",
    });

});

// start server
app.listen(PORT, () => {

    console.log(
        `Server is running on port ${PORT}`
    );

});
