import mongoose, { Schema } from 'mongoose';

const TablesSchema = new mongoose.Schema(
	{
		store: {
			type: Schema.Types.ObjectId,
			ref: 'Stores',
		},
		allTables: [
			{
				name: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		collection: 'tables',
	},
);

export default mongoose.model('Tables', TablesSchema);
