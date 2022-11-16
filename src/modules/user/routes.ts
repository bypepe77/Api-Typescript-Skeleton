import { Express } from 'express';

export const register = (app: Express) => {
    app.get('/user', getUser)
}

const getUser = () => {
    console.log("user test")
}