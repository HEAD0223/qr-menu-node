import { QRService } from '../service/index.js';

export const addQR = async (req, res) => {
	try {
		const { storeId, qr_custom } = req.body;
		const qrData = await QRService.create(storeId, qr_custom);
		return res.json(qrData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to add qr_custom',
		});
	}
};

export const getQR = async (req, res) => {
	try {
		const { storeId } = req.params;
		const qrData = await QRService.getQR(storeId);
		return res.json(qrData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to get qr_custom',
		});
	}
};
