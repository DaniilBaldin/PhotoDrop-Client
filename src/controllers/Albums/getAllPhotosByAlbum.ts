/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import Client from '../../models/clients';
import Photo from '../../models/photo';
import Album from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const getPhotosByAlbum = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        const album_id = req.params.id;
        const albumInfo = await Album.getAlbums(album_id);
        const albumInfoParsed = JSON.parse(JSON.stringify(albumInfo[0]));
        albumInfoParsed[0].owned = false;
        Client.getClientById(person_id).then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            const phone_number = resultParsed[0].phone_number;
            const albums_owned = resultParsed[0].albums_owned.split(',');
            const uniques = albums_owned.filter((x: any, i: any) => i === albums_owned.indexOf(x));
            if (uniques.includes(album_id)) {
                albumInfoParsed[0].owned = true;
            }
            console.log(albumInfoParsed[0]);
            await Photo.getPhotosByAlbum(album_id, phone_number).then((result) => {
                const resultParsed = JSON.parse(JSON.stringify(result[0]));
                res.status(200).json({
                    data: {
                        album: albumInfoParsed[0],
                        photos: resultParsed,
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

export default getPhotosByAlbum;
