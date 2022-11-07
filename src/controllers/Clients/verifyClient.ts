/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
dotenv.config();
import { RequestHandler } from 'express';
import twilio from 'twilio';

import Client from '../../models/clients';
import generateJWT from '../../utils/generateJWT';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID as any;

const client = twilio(accountSid, authToken);

const verifyClient: RequestHandler = async (req, res) => {
    try {
        const phone_number = req.body.phone_number;
        const code = req.body.code;
        console.log(req.body);
        client.verify.v2
            .services(serviceSid)
            .verificationChecks.create({
                to: phone_number,
                code: code,
            })
            .then(async (verification_check) => {
                console.log(verification_check);
                if (verification_check.valid === true) {
                    const verified = 'true';
                    Client.getClientByNumber(phone_number).then(async (result) => {
                        const resultParsed = JSON.parse(JSON.stringify(result[0]));
                        console.log(resultParsed[0]);
                        if (!resultParsed.length) {
                            const client_name = '';
                            const selfie_image = '';
                            const albums_owned = '0';
                            const client = await Client.save(
                                client_name,
                                phone_number,
                                verified,
                                selfie_image,
                                albums_owned
                            );
                            const clientParsed = JSON.parse(JSON.stringify(client[0]));
                            console.log(clientParsed);
                            const id = clientParsed.insertId;
                            console.log(id);
                            const token = generateJWT({ id: id });
                            console.log(token);
                            res.status(201).json({
                                success: true,
                                data: {
                                    newUser: true,
                                    token: token,
                                    user: {
                                        person_id: id,
                                        phone_number: phone_number,
                                        selfie_image: selfie_image,
                                    },
                                },
                            });
                        } else {
                            const id = resultParsed[0].id;
                            console.log(id);
                            const selfie_image = resultParsed[0].selfie_image;
                            const token = generateJWT({ id: id });
                            console.log(token);
                            res.status(200).json({
                                success: true,
                                data: {
                                    newUser: false,
                                    token: token,
                                    user: {
                                        person_id: id,
                                        phone_number: phone_number,
                                        selfie_image: selfie_image,
                                    },
                                },
                            });
                        }
                    });
                } else {
                    console.log('Code is not valid!');
                    return res.status(503).json({
                        error: {
                            message: 'Code is not valid!',
                        },
                        success: false,
                    });
                }
            })
            .catch((err) => {
                res.status(503).json({
                    error: {
                        message: (err as Error).message,
                    },
                    success: false,
                });
            });
    } catch (err) {
        return res.status(503).json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default verifyClient;
