import QRModel from '../models/QR.js';
import StoreModel from '../models/Store.js';
import TableModel from '../models/Tables.js';
import UserModel from '../models/Users.js';

export const create = async (
	storeIndex,
	storeImage,
	storeName,
	storeAddress,
	storePhone,
	storeEmail,
) => {
	const store = await StoreModel.create({
		index: storeIndex,
		image: storeImage,
		name: storeName,
		address: storeAddress,
		phone: storePhone,
		email: storeEmail,
	});

	return { store };
};

export const edit = async (
	storeId,
	storeImage,
	storeName,
	storeAddress,
	storePhone,
	storeEmail,
) => {
	const updatedStore = await StoreModel.findByIdAndUpdate(
		storeId,
		{
			image: storeImage,
			name: storeName,
			address: storeAddress,
			phone: storePhone,
			email: storeEmail,
		},
		{ new: true },
	);
	return { store: updatedStore };
};

export const remove = async (storeId) => {
	await TableModel.deleteMany({ store: storeId });
	await QRModel.deleteMany({ store: storeId });
	await UserModel.deleteMany({ store: storeId });

	const removedStore = await StoreModel.findByIdAndRemove(storeId);

	if (removedStore) {
		const remainingStores = await StoreModel.find().sort({ index: 1 });

		const updatedStores = remainingStores.map((store, index) => ({
			...store.toObject(),
			index: index,
		}));

		for (const store of updatedStores) {
			await StoreModel.findByIdAndUpdate(store._id, { index: store.index });
		}
	}
};

export const schedule = async (storeId, updatedSchedule) => {
	const updatedStore = await StoreModel.findByIdAndUpdate(
		storeId,
		{ schedule: updatedSchedule },
		{ new: true },
	);
	return { store: updatedStore };
};

export const wifi = async (storeId, updatedWiFi) => {
	const updatedStore = await StoreModel.findByIdAndUpdate(
		storeId,
		{ wifi: updatedWiFi },
		{ new: true },
	);
	return { store: updatedStore };
};

export const socials = async (storeId, updatedSocials) => {
	const updatedStore = await StoreModel.findByIdAndUpdate(
		storeId,
		{ socials: updatedSocials },
		{ new: true },
	);
	return { store: updatedStore };
};

export const options = async (storeId, updatedOptions) => {
	const updatedStore = await StoreModel.findByIdAndUpdate(
		storeId,
		{ options: updatedOptions },
		{ new: true },
	);
	return { store: updatedStore };
};

export const indexes = async (stores) => {
	for (const store of stores) {
		await StoreModel.findByIdAndUpdate(store.storeId, { index: store.index });
	}

	const AllStores = await StoreModel.find();
	return { stores: AllStores };
};

export const getAllStores = async () => {
	const stores = await StoreModel.find();
	return stores;
};
