import { Router } from "express";
import path from "path";
import fs from 'fs';

export const registerRoutes = (router: Router) => {
    const modules = fs.readdirSync(path.join(__dirname, 'modules'));
    modules.forEach((module) => {
        const routes = require(`./modules/${module}/routes.ts`);
        routes.register(router);
    });
}

export const register = (routePath: string, app: Router) => {
    const route = require(routePath);
    route.register(app);
}