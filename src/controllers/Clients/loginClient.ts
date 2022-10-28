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
        // console.log(res);
        const phone_number = req.body.phone_number;
        client.verify.v2
            .services(serviceSid)
            .verifications.create({
                to: phone_number,
                channel: 'sms',
            })
            .then(async (verification) => {
                console.log(res);

                console.log(verification);
                res.status(200).json({
                    data: 'Verification message sent!',
                    success: true,
                });
            })
            .catch((err) => {
                res.json({
                    error: {
                        message: (err as Error).message,
                    },
                    success: false,
                });
            });
        // Client.getClientByNumber(phone_number).then((result) => {
        //     const resultParsed = JSON.parse(JSON.stringify(result[0]));
        //     console.log(resultParsed);
        //     if (!resultParsed.length) {
        //         client.verify.v2
        //             .services(serviceSid)
        //             .verifications.create({
        //                 to: phone_number,
        //                 channel: 'sms',
        //             })
        //             .then(async (verification) => {
        //                 console.log(verification);
        //                 res.status(200).json({
        //                     data: 'Verification message sent!',
        //                     success: true,
        //                 });
        //             });
        //     } else {
        //         console.log('User exists!');
        //         const id = resultParsed[0].id;
        //         console.log(id);
        //         const token = generateJWT({ id: id });
        //         return res.status(201).json({
        //             logged: true,
        //             token,
        //             user: {
        //                 person_id: id,
        //                 phone_number: phone_number,
        //             },
        //         });
        //     }
        // });
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
