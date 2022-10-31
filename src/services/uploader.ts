/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import makeThumbnail from 'image-thumbnail';

import Client from '../models/clients';

const BUCKET = process.env.S3_BUCKET;

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(credentials);
const s3 = new AWS.S3();

const uploader = async (files: any, person_id: any) => {
    console.log(files);
    const options: any = {
        percentage: 25,
    };
    const buffer = files[0].buffer;
    const selfie_buffer = await makeThumbnail(new (Buffer.from as any)(buffer), options);
    const type = files[0].originalname.split('.')[1];
    const key = `upload/${crypto.randomUUID()}.${type}`;
    const params = {
        ContentType: files[0].mimetype,
        Bucket: BUCKET,
        Body: selfie_buffer,
        Key: key,
    };
    s3.putObject(params as any).promise();
    const selfie_url = `https://${BUCKET}.s3.amazonaws.com/${params.Key}`;
    const id = person_id;
    await Client.updateSelfie(selfie_url, id);
};

export default uploader;
