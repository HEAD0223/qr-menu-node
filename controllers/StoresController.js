import { StoreService } from '../service/index.js';

export const addStore = async (req, res) => {
	try {
		const { storeIndex, storeImage, storeName, storeAddress, storePhone, storeEmail } = req.body;
		const storeData = await StoreService.create(
			storeIndex,
			storeImage,
			storeName,
			storeAddress,
			storePhone,
			storeEmail,
		);
		return res.json(storeData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to add store',
		});
	}
};

export const editStore = async (req, res) => {
	try {
		const { storeId, storeImage, storeName, storeAddress, storePhone, storeEmail } = req.body;
		const storeData = await StoreService.edit(
			storeId,
			storeImage,
			storeName,
			storeAddress,
			storePhone,
			storeEmail,
		);
		return res.json(storeData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to edit store',
		});
	}
};

export const deleteStore = async (req, res) => {
	try {
		const { storeId } = req.params;
		await StoreService.remove(storeId);
		return res.json({
			message: 'Store deleted successfully',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to delete store',
		});
	}
};

export const updateSchedule = async (req, res) => {
	try {
		const { storeId, schedule } = req.body;
		const storeData = await StoreService.schedule(storeId, schedule);
		return res.json(storeData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to update schedule',
		});
	}
};

export const updateWiFi = async (req, res) => {
	try {
		const { storeId, wifi } = req.body;
		const storeData = await StoreService.wifi(storeId, wifi);
		return res.json(storeData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to update wifi',
		});
	}
};

export const updateSocials = async (req, res) => {
	try {
		const { storeId, socials } = req.body;
		const storeData = await StoreService.socials(storeId, socials);
		return res.json(storeData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to update socials',
		});
	}
};

export const updateOptions = async (req, res) => {
	try {
		const { storeId, options } = req.body;
		const storeData = await StoreService.options(storeId, options);
		return res.json(storeData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to update options',
		});
	}
};

export const updateIndexes = async (req, res) => {
	try {
		const { stores } = req.body;
		const storesData = await StoreService.indexes(stores);
		return res.json(storesData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to update stores indexes',
		});
	}
};

export const getStores = async (req, res) => {
	try {
		const stores = await StoreService.getAllStores();
		return res.json(stores);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to get stores',
		});
	}
};
