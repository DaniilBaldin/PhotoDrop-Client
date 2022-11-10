/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import Convert from 'heic-convert';

import Selfie from '../models/selfies';

const BUCKET = process.env.S3_BUCKET;

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(credentials);
const s3 = new AWS.S3();

const uploaderHEIC = async (files: any, person_id: any) => {
    const buffer = files[0].buffer;
    const convert = async () => {
        const outBuffer = await Convert({
            buffer: buffer,
            format: 'JPEG',
            quality: 1,
        });
        return outBuffer;
    };
    const convertedBuffer = await convert();
    const type = files[0].originalname.split('.')[1];
    const key = `upload/${crypto.randomUUID()}.${type}`;
    const params = {
        ContentType: 'image/jpeg',
        Bucket: BUCKET,
        Body: convertedBuffer,
        Key: key,
    };
    s3.putObject(params as any).promise();
    const selfie_url = `https://${BUCKET}.s3.amazonaws.com/${params.Key}`;
    const id = person_id;
    await Selfie.save(selfie_url, id);
};

export default uploaderHEIC;
