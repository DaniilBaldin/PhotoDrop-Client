import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import clientRouter from './routes/clientRoutes';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setTimeout(200);
    next();
});

app.use(
    cors({
        origin: '*',
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
app.use('/', clientRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
