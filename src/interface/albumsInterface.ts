/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';

export default interface InfoRequest extends Request {
    user?: string;
    person?: any;
}
