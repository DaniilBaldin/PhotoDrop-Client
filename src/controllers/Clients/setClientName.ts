/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import InfoRequest from '../../interface/albumsInterface';

import Client from '../../models/clients';

const setClientName = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        const client_name = req.body.client_name;
        console.log(person_id, client_name);
        await Client.updateClientName(client_name, person_id).then(async () => {
            const person = await Client.getClientById(person_id);
            const personParsed = JSON.parse(JSON.stringify(person[0]));
            res.status(200).json({
                data: personParsed[0],
                success: true,
            });
        });
    } catch (err) {
        res.json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default setClientName;
