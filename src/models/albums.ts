import db from '../utils/databaseConnect';

const albums = class Albums {
    id: number;
    album_name: string;
    album_location: string;
    date: string;
    person_id: string;
    album_logo: string;
    constructor(
        id: number,
        album_name: string,
        album_location: string,
        date: string,
        person_id: string,
        album_logo: string
    ) {
        this.id = id;
        this.album_name = album_name;
        this.album_location = album_location;
        this.date = date;
        this.person_id = person_id;
        this.album_logo = album_logo;
    }

    static getAlbums(id: string) {
        return db.execute(`SELECT * FROM albums WHERE albums.id = ?`, [id]);
    }

    static getAlbumById(id: string, person_id: string) {
        return db.execute(`SELECT * FROM albums WHERE albums.id = ? AND albums.person_id = ?`, [id, person_id]);
    }
};

export default albums;
