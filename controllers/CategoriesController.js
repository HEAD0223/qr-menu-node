import { CategoryService } from '../service/index.js';

export const addCategory = async (req, res) => {
	try {
		const {
			categoryIndex,
			categoryName,
			categoryDescription,
			categoryVisibility,
			categoryStores,
			categoryModifiers,
		} = req.body;
		const categoryData = await CategoryService.create(
			categoryIndex,
			categoryName,
			categoryDescription,
			categoryVisibility,
			categoryStores,
			categoryModifiers,
		);
		return res.json(categoryData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to add category',
		});
	}
};

export const editCategory = async (req, res) => {
	try {
		const { categoryId, categoryName, categoryDescription, categoryStores, categoryModifiers } =
			req.body;
		const categoryData = await CategoryService.edit(
			categoryId,
			categoryName,
			categoryDescription,
			categoryStores,
			categoryModifiers,
		);
		return res.json(categoryData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to edit category',
		});
	}
};

export const deleteCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;
		await CategoryService.remove(categoryId);
		return res.json({
			message: 'Category deleted successfully',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to delete category',
		});
	}
};

export const updateIndexes = async (req, res) => {
	try {
		const { categories } = req.body;
		const categoryData = await CategoryService.indexes(categories);
		return res.json(categoryData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to update categories indexes',
		});
	}
};

export const updateVisibility = async (req, res) => {
	try {
		const { categoryId, visibility } = req.body;
		const categoryData = await CategoryService.visibility(categoryId, visibility);
		return res.json(categoryData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to update visibility',
		});
	}
};

export const getCategories = async (req, res) => {
	try {
		const categories = await CategoryService.getAllCategories();
		return res.json(categories);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to get categories',
		});
	}
};
