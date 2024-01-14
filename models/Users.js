import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			uniqe: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		accessLevel: {
			type: String,
			required: true,
		},
		activationLink: {
			type: String,
		},
		isActivated: {
			type: Boolean,
			default: false,
		},
		store: {
			type: Schema.Types.ObjectId,
			ref: 'Stores',
		},
	},
	{
		collection: 'users',
	},
);

export default mongoose.model('Users', UserSchema);
