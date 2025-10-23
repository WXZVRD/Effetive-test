import app from "./app";
import {Request, Response} from "express";
import {AppDataSource} from "./configs/database.config";

async function startServer() {
    try {
        console.log('🚀 Starting application initialization...');

        await AppDataSource.initialize()
        console.log(`✅ Database successfully connected!`);

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`✅ Server is running at http://localhost:${port}`);
        });
    } catch (error){
        console.error('Something went wrong: ', error);
        process.exit(1);    }
}

startServer()