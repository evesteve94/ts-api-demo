import { Router, Request, Response, NextFunction } from 'express';
import * as malmoboController from '../controllers/malmobos.controllers';
import { malmoboSchema } from '../validation/validation';

const router = Router();

// Middleware function for validation
const validateMalmobo = (req: Request, res: Response, next: NextFunction) => {
    const { error } = malmoboSchema.validate(req.body, { abortEarly: false });
    if (error) {
        // Collect all validation errors
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};

router.get('/', malmoboController.getAllMalmobos);
router.get('/:id', malmoboController.getMalmoboById);
router.post('/', validateMalmobo, malmoboController.createMalmobo);
router.put('/:id', validateMalmobo, malmoboController.updateMalmobo);
router.delete('/:id', malmoboController.deleteMalmobo);

export default router;
