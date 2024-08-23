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


//Skapa en typ (interface)
/*
Retain the Malmobo interface: It provides type safety and documentation, 
helping you avoid bugs by ensuring data structures are consistent throughout your application.
*/
interface Malmobo {
    id: number;
    name: string;
    nickname: string;
}

interface Posts {
    id: number,
    date: string,
    title: string,
    content: string,
    // forgein key
    malmobo_id: number,
    created_at: string
}

//dummy data
// let malmobos: Malmobo[] = [
//     {id: 1, name: "Eva", nickname: "evesteve"},
//     {id: 2, name: "Caroline", nickname: "carstern"},
//     {id: 3, name: "Aleksei", nickname: "beefMan"},
//     {id: 4, name: "Jason", nickname: ".json"},
// ]


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});