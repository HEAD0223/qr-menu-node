import CategoryModel from '../models/Category.js';

export const create = async (
	categoryIndex,
	categoryName,
	categoryDescription,
	categoryVisibility,
	categoryStores,
	categoryModifiers,
) => {
	const category = await CategoryModel.create({
		index: categoryIndex,
		name: categoryName,
		description: categoryDescription,
		visibility: categoryVisibility,
		stores: categoryStores,
		modifiers: categoryModifiers,
	});

	return { category };
};

export const edit = async (
	categoryId,
	categoryName,
	categoryDescription,
	categoryStores,
	categoryModifiers,
) => {
	const updatedCategory = await CategoryModel.findByIdAndUpdate(
		categoryId,
		{
			name: categoryName,
			description: categoryDescription,
			stores: categoryStores,
			modifiers: categoryModifiers,
		},
		{ new: true },
	);
	return { category: updatedCategory };
};

export const remove = async (categoryId) => {
	// await FoodModel.deleteMany({ category: categoryId });

	const removedCategory = await CategoryModel.findByIdAndRemove(categoryId);

	if (removedCategory) {
		const remainingCategories = await CategoryModel.find().sort({ index: 1 });

		const updatedCategories = remainingCategories.map((category, index) => ({
			...category.toObject(),
			index: index,
		}));

		for (const category of updatedCategories) {
			await CategoryModel.findByIdAndUpdate(category._id, { index: category.index });
		}
	}
};

export const indexes = async (categories) => {
	for (const category of categories) {
		await CategoryModel.findByIdAndUpdate(category.categoryId, { index: category.index });
	}

	const AllCategories = await CategoryModel.find();
	return { categories: AllCategories };
};

export const visibility = async (categoryId, updatedVisibility) => {
	const updatedCategory = await CategoryModel.findByIdAndUpdate(
		categoryId,
		{ visibility: updatedVisibility },
		{ new: true },
	);
	return { category: updatedCategory };
};

export const getAllCategories = async () => {
	const categories = await CategoryModel.find();
	return categories;
};
