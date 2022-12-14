import db from '../utils/databaseConnect';

const client = class Client {
    id: string;
    client_name: string;
    phone_number: string;
    admin_id: string;
    selfie_image: string;
    verified: string;
    albums_owned: string;
    constructor(
        id: string,
        photo_logo: string,
        photo_name: string,
        admin_id: string,
        selfie_image: string,
        verified: string,
        albums_owned: string
    ) {
        this.id = id;
        this.client_name = photo_logo;
        this.phone_number = photo_name;
        this.admin_id = admin_id;
        this.selfie_image = selfie_image;
        this.verified = verified;
        this.albums_owned = albums_owned;
    }

    static save(
        client_name: string,
        phone_number: string,
        verified: string,
        selfie_image: string,
        albums_owned: string
    ) {
        return db.execute(
            'INSERT INTO clients (client_name, phone_number, verified, selfie_image, albums_owned) VALUES (?, ?, ?, ?, ?)',
            [client_name, phone_number, verified, selfie_image, albums_owned]
        );
    }

    static getClients(admin_id: string) {
        return db.execute(`SELECT * FROM clients WHERE clients.admin_id = ?`, [admin_id]);
    }

    static getClientByNumber(phone_number: string) {
        return db.execute(`SELECT * FROM clients WHERE clients.phone_number = ?`, [phone_number]);
    }

    static getClientById(id: string) {
        return db.execute(`SELECT * FROM clients WHERE clients.id = ?`, [id]);
    }

    static updateSelfie(selfie_image: string, id: string) {
        return db.execute(`UPDATE clients SET clients.selfie_image = ? WHERE clients.id = ?`, [selfie_image, id]);
    }

    static updateClientName(client_name: string, id: string) {
        return db.execute(`UPDATE clients SET clients.client_name = ? WHERE clients.id = ?`, [client_name, id]);
    }

    static updateAlbumsOwned(albums_owned: string, id: string) {
        return db.execute(
            `UPDATE clients SET clients.albums_owned = CONCAT_WS(CHAR(0x2C USING UTF8),clients.albums_owned, ${albums_owned}) WHERE clients.id = ?`,
            [id]
        );
    }
};

export default client;
