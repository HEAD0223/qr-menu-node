import dotenv from 'dotenv';
import { UserService } from '../service/index.js';

dotenv.config();

export const addUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password, accessLevel, storeId } = req.body;
		const userData = await UserService.registration(
			firstName,
			lastName,
			email,
			password,
			accessLevel,
			storeId,
		);
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		});
		return res.json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to add user',
		});
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userData = await UserService.login(email, password);
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		});
		return res.json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to login user',
		});
	}
};

export const logoutUser = async (req, res) => {
	try {
		const { refreshToken } = req.cookies;
		const token = await UserService.logout(refreshToken);
		res.clearCookie('refreshToken');
		return res.json(token);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to logout user',
		});
	}
};

export const activateUser = async (req, res) => {
	try {
		const activationLink = req.params.link;
		await UserService.activate(activationLink);
		return res.redirect(process.env.CLIENT_URL);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to activate user',
		});
	}
};

export const refreshUser = async (req, res) => {
	try {
		const { refreshToken } = req.cookies;
		const userData = await UserService.refresh(refreshToken);
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		});
		return res.json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to refresh user',
		});
	}
};

export const getUsers = async (req, res) => {
	try {
		const { storeId } = req.params;
		const users = await UserService.getAllUsers(storeId);
		return res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to get users',
		});
	}
};

export const editUsers = async (req, res) => {
	try {
		const { user } = req.body;
		const userData = await UserService.edit(user);
		return res.json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to edit user',
		});
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await UserService.remove(userId);
		return res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to remove user',
		});
	}
};
