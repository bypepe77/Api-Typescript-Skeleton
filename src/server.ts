import express, { Router } from "express"
import * as http from 'http';
import errorHandler from 'errorhandler';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors'
import { registerRoutes } from "./registerRoutes";


export class Server {
    private app: express.Express;
    private port: string
    httpServer?: http.Server 
    
    constructor(port: string){
        this.port = port;
        this.app = express();
    }

    loadMiddlewares(): any{
        this.app.use(helmet.xssFilter());
        this.app.use(helmet.noSniff());
        this.app.use(helmet.hidePoweredBy());
        this.app.use(helmet.frameguard({ action: 'deny' }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(compress());
        const router = Router();
        router.use(cors());
        router.use(errorHandler());
        this.app.use(router);
        registerRoutes(router)

        router.use((err: Error)  => {
            console.log("Error", err)
        });
    }

    async start(): Promise<void> {
        return new Promise(resolve => {
            this.httpServer = this.app.listen(this.port, () => {
                this.loadMiddlewares()
                console.log("Backend is running in", this.port)
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if(this.httpServer){
                this.httpServer.close(error => {
                    if(error) return reject(error)
                    return resolve();
                });
            }
            return resolve();
        });
    }

    getServer() {
        return this.httpServer;
    }


}

