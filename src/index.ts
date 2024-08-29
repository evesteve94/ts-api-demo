// SERVER
import express, { Request, Response } from "express";
import malmobosRoute from "./routes/malmoboRoute"; // Ensure correct path
import postsRoute from "./routes/postRoute"

const app = express();
const PORT = 3011;


//middleware för att tolka json.
/*
Keep the express.json() middleware: It’s still necessary for parsing incoming 
JSON data, which is common in REST APIs.
*/
app.use(express.json());

// Use the routes
app.use('/api/malmobos', malmobosRoute);
app.use('/api/posts', postsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});