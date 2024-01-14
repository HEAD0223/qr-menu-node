import mongoose, { Schema } from 'mongoose';

const CategorySchema = new mongoose.Schema(
	{
		index: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
		visibility: {
			type: Boolean,
			default: true,
		},
		stores: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Stores',
			},
		],
		modifiers: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Modifiers',
			},
		],
	},
	{
		collection: 'categories',
	},
);

export default mongoose.model('categories', CategorySchema);
