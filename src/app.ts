import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import clientRouter from './routes/clientRoutes';
import albumsRouter from './routes/albumsRoutes';
import photoRouter from './routes/photoRoutes';
import paymentRouter from './routes/paymentRoutes';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setTimeout(999);
    next();
});

app.use(
    cors({
        origin: 'https://photographers-client.vercel.app/*',
        methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Uppy-Versions',
            'Accept',
            'x-requested-with',
            'Access-Control-Allow-Origin',
        ],
        exposedHeaders: ['Access-Control-Allow-Headers', 'Access-Control-Allow-Origin'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.get('/', (req, res) => {
    res.send('Hello there! General Kenobi!');
});

app.use(express.json());
app.use('/', clientRouter, albumsRouter, photoRouter, paymentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
