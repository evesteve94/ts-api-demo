"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// SERVER
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3011;
//middleware för att tolka json
app.use(express_1.default.json());
//dummy data
let malmobos = [
    { id: 1, name: "Eva", nickname: "evesteve" },
    { id: 2, name: "Caroline", nickname: "carstern" },
    { id: 3, name: "Aleksei", nickname: "beefMan" },
    { id: 4, name: "Jason", nickname: ".json" },
];
//READ
app.get('/api/malmobos', (req, res) => {
    res.send(malmobos);
});
//CREATE
app.post('/api/malmobos', (req, res) => {
    const newMalmobo = Object.assign({ id: malmobos.length + 1 }, req.body);
    malmobos.push(newMalmobo);
    res.status(201).json(newMalmobo);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
