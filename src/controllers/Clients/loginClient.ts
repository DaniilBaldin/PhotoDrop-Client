/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import twilio from 'twilio';

// import Client from '../../models/clients';
// import generateJWT from '../../utils/generateJWT';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID as any;

const client = twilio(accountSid, authToken);

const loginClient: RequestHandler = async (req, res) => {
    try {
        const phone_number = req.body.phone_number;
        client.verify.v2
            .services(serviceSid)
            .verifications.create({
                to: phone_number,
                channel: 'sms',
            })
            .then(async (verification) => {
                console.log(verification);
                res.status(200).json({
                    data: {
                        message: 'Verification message sent!',
                    },
                    success: true,
                });
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
        res.json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default loginClient;
