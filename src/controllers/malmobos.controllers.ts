import { Request, Response } from 'express-serve-static-core';
import { handleError } from '../utils/errorHandling';
import * as malmoboHandlers from '../handlers/malmobos.handlers';
import { MalmobosDTO } from '../dtos/malmobos.dto';
import { Malmobos } from '../types/malmobos.types';

export const getAllMalmobos = async (req: Request, res: Response) => {
    try {
        //redan typad som Malmobos[] iom handlern ==> Promise<Malmobos[]>
        const malmobos = await malmoboHandlers.getAllMalmobos();
        res.json(malmobos);
    } catch (err) {
        handleError(err, res);
    }
};

export const getMalmoboById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const malmobo = await malmoboHandlers.getMalmoboById(parseInt(id, 10));
        if (malmobo) {
            res.json(malmobo);
        } else {
            res.status(404).send("Malmobo not found");
        }
    } catch (err) {
        handleError(err, res);
    }
};

// CREATE a new Malmobo
export const createMalmobo = async (req: Request, res: Response) => {
    const malmoboData: MalmobosDTO = req.body;
    try {
        const newMalmobo = await malmoboHandlers.createMalmobo(malmoboData);
        res.status(201).json(newMalmobo);
    } catch (err) {
        handleError(err, res);
    }
};

// UPDATE an existing Malmobo
export const updateMalmobo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const malmoboData: MalmobosDTO = req.body;
    try {
        const updatedMalmobo = await malmoboHandlers.updateMalmobo(parseInt(id, 10), malmoboData);
        if (updatedMalmobo) {
            res.json(updatedMalmobo);
        } else {
            res.status(404).send("Malmobo not found");
        }
    } catch (err) {
        handleError(err, res);
    }
};

// DELETE a Malmobo
export const deleteMalmobo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedMalmobo = await malmoboHandlers.deleteMalmobo(parseInt(id, 10));
        if (deletedMalmobo) {
            res.status(204).send();
        } else {
            res.status(404).send("Malmobo not found");
        }
    } catch (err) {
        handleError(err, res);
    }
};
