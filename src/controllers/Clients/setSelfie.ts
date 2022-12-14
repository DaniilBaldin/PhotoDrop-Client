/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import InfoRequest from '../../interface/albumsInterface';

import Client from '../../models/clients';
import Selfie from '../../models/selfies';

import uploader from '../../services/uploader';
import uploaderHEIC from '../../services/uploaderHEIC';

const setSelfie = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        const files = req.files;
        const filesParsed = JSON.parse(JSON.stringify(files));
        console.log(filesParsed);
        const type = filesParsed[0].originalname.split('.').reverse()[0];
        if (type !== 'heic') {
            await uploader(files, person_id);
        } else if (type === 'HEIC') {
            await uploader(files, person_id);
        } else {
            await uploaderHEIC(files, person_id);
        }
        Selfie.getSelfiesById(person_id).then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            const selfie_url = resultParsed.reverse()[0].selfie_url;
            Client.updateSelfie(selfie_url, person_id).then(() => {
                res.status(200).json({
                    data: {
                        id: person_id,
                        selfie_url: selfie_url,
                    },
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

export default setSelfie;
