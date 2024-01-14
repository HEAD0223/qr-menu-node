import mongoose, { Schema } from 'mongoose';

const TokenSchema = new mongoose.Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
		},
		refreshToken: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'tokens',
	},
);

export default mongoose.model('Tokens', TokenSchema);
