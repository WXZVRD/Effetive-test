import app from "./app";
import {Request, Response} from "express";
import {AppDataSource} from "./configs/database.config";

async function startServer() {
    try {
        await AppDataSource.initialize()
        console.log(`✅ Database successfully connected!`);

        const port = process.env.PORT || 3000;

        app.get('/', (req: Request, res: Response) => {
            res.send('Hello world');
        });

        app.listen(port, () => {
            console.log(`✅ Server is running at http://localhost:${port}`);
        });
    } catch (error){
        console.error('Something went wrong: ', error);
    }
}

startServer()