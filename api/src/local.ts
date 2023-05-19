import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';

console.log('server listening at port 80');
app.listen(80);
