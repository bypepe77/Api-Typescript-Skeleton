import { Server } from './server';


export class Api {
    server?: Server

    async start() {
        const port = '3000'
        this.server = new Server(port)

        await this.server.start()
    }

    get httpServer() {
        return this.server?.getServer();
    }
}