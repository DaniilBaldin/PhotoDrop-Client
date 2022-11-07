/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import Client from '../../models/clients';
import Photo from '../../models/photo';

import InfoRequest from '../../interface/albumsInterface';

const getPhotosByUser = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        Client.getClientById(person_id).then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            const phone_number = resultParsed[0].phone_number;
            const albums_owned = resultParsed[0].albums_owned.split(',');
            const uniques = albums_owned.filter((x: any, i: any) => i === albums_owned.indexOf(x));
            await Photo.getPhotosByNumber(phone_number).then((result) => {
                const resultParsed = JSON.parse(JSON.stringify(result[0]));
                const finalPhotos = resultParsed.map((e: any) => {
                    if (uniques.includes(e.album_id)) {
                        // console.log(true);
                        return { ...e, owned: true };
                    } else {
                        // console.log(false);
                        return { ...e, owned: false };
                    }
                });
                // console.log(finalPhotos);
                res.status(200).json({
                    data: finalPhotos,
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

export default getPhotosByUser;
