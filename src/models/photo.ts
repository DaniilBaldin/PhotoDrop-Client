import db from '../utils/databaseConnect';

const photo = class Photo {
    photo_id: string;
    photo_logo: string;
    client_name: string;
    photo_url: string;
    album_id: string;
    date: string;
    constructor(
        photo_id: string,
        photo_logo: string,
        client_name: string,
        photo_url: string,
        album_id: string,
        date: string
    ) {
        this.photo_id = photo_id;
        this.photo_logo = photo_logo;
        this.client_name = client_name;
        this.photo_url = photo_url;
        this.album_id = album_id;
        this.date = date;
    }

    static getPhotosByNumber(client_name: string) {
        return db.execute(`SELECT * FROM photo WHERE photo.client_name LIKE '%${client_name}%'`);
    }

    static getPhotosByAlbum(album_id: string, client_name: string) {
        return db.execute(
            `SELECT * FROM photo WHERE photo.album_id = ? AND photo.client_name LIKE '%${client_name}%'`,
            [album_id]
        );
    }
};

export default photo;
