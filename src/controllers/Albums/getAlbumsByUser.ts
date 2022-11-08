/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import Client from '../../models/clients';
import Photo from '../../models/photo';
import Album from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const getAlbumsByUser = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        const albums_id: any[] = [];
        Client.getClientById(person_id).then((result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            const phone_number = resultParsed[0].phone_number;
            const albums_owned = resultParsed[0].albums_owned.split(',');
            const uniqueAlbums = albums_owned.filter((x: any, i: any) => i === albums_owned.indexOf(x));
            Photo.getPhotosByNumber(phone_number).then(async (result) => {
                const resultParsed = JSON.parse(JSON.stringify(result[0]));
                resultParsed.forEach((e: any) => {
                    albums_id.push(e.album_id);
                });
                const uniques = albums_id.filter((x, i) => i === albums_id.indexOf(x));
                const albums = uniques.map(async (e) => {
                    const album = await Album.getAlbums(e);
                    const albumParsed = JSON.parse(JSON.stringify(album[0]));
                    if (uniqueAlbums.includes(e)) {
                        albumParsed[0].owned = true;
                    } else {
                        albumParsed[0].owned = false;
                    }
                    return albumParsed[0];
                });
                const resultAlbums = await Promise.all(albums);
                res.status(200).json({
                    data: resultAlbums,
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

export default getAlbumsByUser;
