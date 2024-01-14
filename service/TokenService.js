import jwt from 'jsonwebtoken';
import TokenModel from '../models/Token.js';

export const generateTokens = async (payload) => {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
	return {
		accessToken,
		refreshToken,
	};
};

export const validateAccessToken = async (token) => {
	try {
		const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		return userData;
	} catch (error) {
		return null;
	}
};

export const validateRefreshToken = async (token) => {
	try {
		const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
		return userData;
	} catch (error) {
		return null;
	}
};

export const saveToken = async (userId, refreshToken) => {
	const tokenData = await TokenModel.findOne({ user: userId });
	if (tokenData) {
		tokenData.refreshToken = refreshToken;
		return tokenData.save();
	}
	const token = await TokenModel.create({ user: userId, refreshToken });
	return token;
};

export const removeToken = async (refreshToken) => {
	const tokenData = await TokenModel.deleteOne({ refreshToken });
	return tokenData;
};

export const findToken = async (refreshToken) => {
	const tokenData = await TokenModel.findOne({ refreshToken });
	return tokenData;
};
