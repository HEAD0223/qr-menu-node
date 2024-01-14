import mongoose from 'mongoose';

const wifiSchema = new mongoose.Schema({
	encryptionType: {
		type: String,
		default: '',
	},
	ssid: {
		type: String,
		default: '',
	},
	password: {
		type: String,
		default: '',
	},
});

const socialsSchema = new mongoose.Schema({
	website: {
		type: String,
		default: '',
	},
	facebook: {
		type: String,
		default: '',
	},
	instagram: {
		type: String,
		default: '',
	},
	twitter: {
		type: String,
		default: '',
	},
	tripAdvisor: {
		type: String,
		default: '',
	},
	customerReviews: {
		type: String,
		default: '',
	},
});

const optionsSchema = new mongoose.Schema({
	enableTakeaway: {
		type: Boolean,
		default: false,
	},
	enableDineIn: {
		type: Boolean,
		default: false,
	},
});

const StoreSchema = new mongoose.Schema(
	{
		index: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			default: '',
		},
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			default: '',
		},
		email: {
			type: String,
			default: '',
		},
		schedule: [
			{
				day: {
					type: String,
					default: '',
				},
				enabled: {
					type: Boolean,
					default: true,
				},
				openingTime: {
					type: String,
					default: '',
				},
				closingTime: {
					type: String,
					default: '',
				},
			},
		],
		wifi: [wifiSchema],
		socials: [socialsSchema],
		options: [optionsSchema],
	},
	{
		collection: 'stores',
	},
);

export default mongoose.model('Stores', StoreSchema);
