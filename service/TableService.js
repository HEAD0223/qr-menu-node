import TablesModel from '../models/Tables.js';

export const create = async (storeId, newTables) => {
	let existingTables = await TablesModel.findOne({ store: storeId });

	if (existingTables) {
		existingTables.allTables = existingTables.allTables.concat(newTables);
		await existingTables.save();
		return { tables: existingTables };
	}
	const createdTables = await TablesModel.create({
		store: storeId,
		allTables: newTables,
	});

	return { tables: createdTables };
};

export const edit = async (storeId, updatedTable) => {
	const candidate = await TablesModel.findOne({ store: storeId });
	if (!candidate) {
		throw new Error(`Store with storeId << ${storeId} >> not found`);
	}

	const existingTable = candidate.allTables.find(
		(table) => table._id.toString() === updatedTable._id,
	);
	if (existingTable) {
		existingTable.name = updatedTable.name;
		existingTable.qr_code = updatedTable.qr_code;
	}

	const updatedStore = await candidate.save();

	return { table: updatedStore };
};

export const remove = async (storeId, tables) => {
	await TablesModel.updateOne(
		{ store: storeId },
		{
			$pull: { allTables: { _id: { $in: tables } } },
		},
	);
};

export const getAllTables = async (storeId) => {
	const candidate = await TablesModel.findOne({ store: storeId });
	if (!candidate) {
		return [];
	}
	return candidate.allTables;
};
