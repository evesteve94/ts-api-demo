import { Router, Request, Response, NextFunction } from 'express';
import * as postsController from '../controllers/posts.controllers';
import { postSchema } from '../validation/validation';

const router = Router();

// Middleware to validate Post data -Ensures incoming data meets the required format before reaching the controllers.
const validatePost = (req: Request, res: Response, next: NextFunction) => {
    const { error } = postSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', validatePost, postsController.createPost);
router.put('/:id', validatePost, postsController.updatePost);
router.delete('/:id', postsController.deletePost);

export default router;
