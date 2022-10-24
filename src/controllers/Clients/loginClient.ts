import { RequestHandler } from 'express';

import Client from '../../models/clients';
import generateJWT from '../../utils/generateJWT';

const loginClient: RequestHandler = async (req, res) => {
    try {
        // const { login, password } = req.body;
        // const result = await Admin.find(login, password);
        // const person = JSON.parse(JSON.stringify(result[0]));
        // if (person[0] === undefined) {
        //     return res.status(404).json({ logged: false, message: 'User not found. Invalid Login or Password.' });
        // }
        // const token = generateJWT({ id: person[0].id });
        // return res.json({
        //     logged: true,
        //     token,
        //     user: {
        //         person_id: person[0].id,
        //         login: person[0].user,
        //     },
        // });
    } catch (err) {
        res.json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default loginClient;
