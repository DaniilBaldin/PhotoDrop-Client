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
        const client_name = phone_number;
        const selfie_image = 'default';
        console.log(req.body);
        client.verify.v2
            .services(serviceSid)
            .verificationChecks.create({
                to: phone_number,
                code: code,
            })
            .then(async (verification_check) => {
                if (verification_check.valid === true) {
                    const verified = 'true';
                    const client = await Client.save(phone_number, client_name, verified, selfie_image);
                    const clientParsed = JSON.parse(JSON.stringify(client[0]));
                    console.log(clientParsed);
                    const token = generateJWT({ id: clientParsed.id });
                    console.log(token);
                    res.json({
                        logged: true,
                        token,
                        user: {
                            phone_number: phone_number,
                        },
                    });
                } else {
                    console.log('Code is not valid!');
                    return res.json({
                        error: {
                            message: 'Code is not valid!',
                        },
                        success: false,
                    });
                }
            });
    } catch (err) {
        return res.json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default verifyClient;