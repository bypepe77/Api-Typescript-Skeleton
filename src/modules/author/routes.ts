import { Express } from 'express';

export const register = (app: Express) => {
    app.get('/author', getAuthor)
}

const getAuthor = () => {
    console.log("author test")
}