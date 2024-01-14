import { TokenService } from '../service/index.js';

export const AuthMiddleware = async (req, res, next) => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return res.status(401).json({
				message: 'User not authorized - authorizationHeader',
			});
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			return res.status(401).json({
				message: 'User not authorized - accessToken',
			});
		}

		const userData = await TokenService.validateAccessToken(accessToken);
		if (!userData) {
			return res.status(401).json({
				message: 'User not authorized - userData',
			});
		}

		req.user = userData;
		next();
	} catch (error) {
		console.error(error);
		res.status(401).json({
			message: 'User not authorized',
		});
	}
};
