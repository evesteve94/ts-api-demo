import { Response } from 'express';

export function handleError(error: unknown, res: Response) {
    if (error instanceof Error) {
        // Known error type
        console.error(error.message);
        res.status(500).json({ error: error.message });
    } else {
        // Unknown error type
        console.error("Unknown error occurred", error);
        res.status(500).json({ error: "Unknown error occurred" });
    }
}
