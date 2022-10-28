import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import makeThumbnail from 'image-thumbnail';

const BUCKET = process.env.S3_BUCKET;
