/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import Client from '../../models/clients';
import Photo from '../../models/photo';

import InfoRequest from '../../interface/albumsInterface';

const getPhotosByAlbum = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        const album_id = req.params.id;
        Client.getClientById(person_id).then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            const phone_number = resultParsed[0].phone_number;
            await Photo.getPhotosByAlbum(album_id, phone_number).then((result) => {
                const resultParsed = JSON.parse(JSON.stringify(result[0]));
                console.log(resultParsed);
                res.status(200).json({
                    data: resultParsed,
                    success: true,
                });
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

export default getPhotosByAlbum;
