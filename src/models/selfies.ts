import db from '../utils/databaseConnect';

const selfie = class Selfie {
    id: string;
    selfie_url: string;
    client_id: string;
    constructor(id: string, selfie_url: string, client_id: string) {
        this.id = id;
        this.selfie_url = selfie_url;
        this.client_id = client_id;
    }

    static save(selfie_url: string, client_id: string) {
        return db.execute('INSERT INTO selfies (selfie_url, client_id) VALUES (?, ?)', [selfie_url, client_id]);
    }

    static getSelfiesById(client_id: string) {
        return db.execute(`SELECT * FROM selfies WHERE selfies.client_id = ?`, [client_id]);
    }
};

export default selfie;
