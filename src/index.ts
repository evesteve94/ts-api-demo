// SERVER
import express, { Request, Response } from "express";

const app = express();
const PORT = 3011;

//middleware för att tolka json
app.use(express.json());

//Skapa en typ (interface)
interface Malmobo {
    id: number;
    name: string;
    nickname: string;
}

//dummy data
let malmobos: Malmobo[] = [
    {id: 1, name: "Eva", nickname: "evesteve"},
    {id: 2, name: "Caroline", nickname: "carstern"},
    {id: 3, name: "Aleksei", nickname: "beefMan"},
    {id: 4, name: "Jason", nickname: ".json"},
]

//READ
app.get('/api/malmobos',(req: Request, res: Response) =>{
    res.send(malmobos)
})

//CREATE
app.post('/api/malmobos',(req: Request, res: Response) =>{
    const newMalmobo: Malmobo = {id: malmobos.length + 1, ...req.body};
    malmobos.push(newMalmobo);
    res.status(201).json(newMalmobo)
})



app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})