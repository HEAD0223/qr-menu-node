import { TableService } from '../service/index.js';

export const addTables = async (req, res) => {
	try {
		const { storeId, tables } = req.body;
		const tablesData = await TableService.create(storeId, tables);
		return res.json(tablesData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to add tables',
		});
	}
};

export const editTables = async (req, res) => {
	try {
		const { storeId, table } = req.body;
		const tablesData = await TableService.edit(storeId, table);
		return res.json(tablesData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to edit tables',
		});
	}
};

export const deleteTables = async (req, res) => {
	try {
		const { storeId, tables } = req.body;
		await TableService.remove(storeId, tables);
		return res.json({
			message: 'Tables deleted successfully',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to delete tables',
		});
	}
};

export const getTables = async (req, res) => {
	try {
		const { storeId } = req.params;
		const tablesData = await TableService.getAllTables(storeId);
		return res.json(tablesData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to get tables',
		});
	}
};
