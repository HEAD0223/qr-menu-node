import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
// import https from 'https';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import adminRouter from './routes/admin.js';
import userRouter from './routes/user.js';

dotenv.config();

mongoose
	.connect(process.env.DB_LINK)
	.then(() => console.log('DB - Ok'))
	.catch((err) => console.log(`DB - Error -> ${err}`));

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	}),
);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

const sslOptions = {
	key: fs.readFileSync('./certificates/privkey.pem'),
	cert: fs.readFileSync('./certificates/fullchain.pem'),
};

// Use the `https` module to create the server
// const server = https.createServer(sslOptions, app);

// server.listen(443, (err) => {
// 	if (err) {
// 		return console.log(err);
// 	}
// 	console.log(`Server running on port 443 (HTTPS)`);
// });

app.listen(8080, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(`Server running on port 8080`);
});
