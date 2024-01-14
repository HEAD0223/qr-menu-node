import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/Users.js';
import { MailService, TokenService } from '../service/index.js';

export const registration = async (firstName, lastName, email, password, accessLevel, storeId) => {
	const candidate = await UserModel.findOne({ email });
	if (candidate) {
		throw new Error(`User with this email address << ${email} >> already exists`);
	}
	const hashPassword = await bcrypt.hash(password, 3);
	const activationLink = uuidv4(); // v34fa-asfasf-142saf-sa-asf

	const user = await UserModel.create({
		firstName,
		lastName,
		email,
		password: hashPassword,
		accessLevel,
		activationLink,
		store: storeId,
	});
	await MailService.sendActivationMail(
		email,
		password,
		`${process.env.API_URL}/activate/${activationLink}`,
	);

	const tokens = await TokenService.generateTokens({
		id: user._id,
		email,
		isActivated: user.isActivated,
	});
	await TokenService.saveToken(user._id, tokens.refreshToken);

	return { ...tokens, user };
};

export const activate = async (activationLink) => {
	const user = await UserModel.findOne({ activationLink });
	if (!user) {
		throw new Error('Incorrect activation link');
	}
	user.isActivated = true;
	await user.save();
};

export const login = async (email, password) => {
	const user = await UserModel.findOne({ email });
	if (!user) {
		throw new Error('User with this email was not found');
	}
	const isPassEquals = await bcrypt.compare(password, user.password);
	if (!isPassEquals) {
		throw new Error('Incorrect password');
	}

	const tokens = await TokenService.generateTokens({
		id: user._id,
		email,
		isActivated: user.isActivated,
	});
	await TokenService.saveToken(user._id, tokens.refreshToken);

	return { ...tokens, user };
};

export const logout = async (refreshToken) => {
	const token = await TokenService.removeToken(refreshToken);
	return token;
};

export const refresh = async (refreshToken) => {
	if (!refreshToken) {
		throw new Error('User not authorized');
	}
	const userData = await TokenService.validateRefreshToken(refreshToken);
	const tokenFromDb = await TokenService.findToken(refreshToken);
	if (!userData || !tokenFromDb) {
		throw new Error('User not authorized');
	}

	const user = await UserModel.findById(userData.id);
	const tokens = await TokenService.generateTokens({
		id: user._id,
		email: user.email,
		isActivated: user.isActivated,
	});
	await TokenService.saveToken(user._id, tokens.refreshToken);

	return { ...tokens, user };
};

export const getAllUsers = async (storeId) => {
	const users = await UserModel.find({ store: storeId });
	if (!users) {
		return [];
	}
	return users;
};

export const edit = async (updatedUser) => {
	const candidate = await UserModel.findOne({ _id: updatedUser._id });
	if (!candidate) {
		throw new Error(`User with _id << ${updatedUser._id} >> not found`);
	}

	candidate.firstName = updatedUser.firstName;
	candidate.lastName = updatedUser.lastName;
	candidate.accessLevel = updatedUser.accessLevel;
	candidate.isActivated = updatedUser.isActivated;

	const updatedUserInDb = await candidate.save();

	return { user: updatedUserInDb };
};

export const remove = async (userId) => {
	const user = await UserModel.findByIdAndRemove(userId);
	if (!user) {
		return [];
	}
	return user;
};
