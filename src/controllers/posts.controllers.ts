import { Request, Response } from 'express';
import { handleError } from '../utils/errorHandling';
import * as postHandlers from '../handlers/posts.handlers';
import { PostsDTO } from '../dtos/posts.dto';

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await postHandlers.getAllPosts();
        res.json(posts);
    } catch (err) {
        handleError(err, res);
    }
};

export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const post = await postHandlers.getPostById(parseInt(id, 10));
        if (post) {
            res.json(post);
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        handleError(err, res);
    }
};

export const createPost = async (req: Request, res: Response) => {
    const postData: PostsDTO = req.body;
    try {
        const newPost = await postHandlers.createPost(postData);
        res.status(201).json(newPost);
    } catch (err) {
        handleError(err, res);
    }
};

export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const postData: PostsDTO = req.body;
    try {
        const updatedPost = await postHandlers.updatePost(parseInt(id, 10), postData);
        if (updatedPost) {
            res.json(updatedPost);
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        handleError(err, res);
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedPost = await postHandlers.deletePost(parseInt(id, 10));
        if (deletedPost) {
            res.status(204).send();
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        handleError(err, res);
    }
};
