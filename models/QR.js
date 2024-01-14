import mongoose, { Schema } from 'mongoose';

const eyeCustomRadius = new mongoose.Schema({
	eyeradius_0_outer_0: {
		type: Number,
		default: 0,
	},
	eyeradius_0_outer_1: {
		type: Number,
		default: 0,
	},
	eyeradius_0_outer_2: {
		type: Number,
		default: 0,
	},
	eyeradius_0_outer_3: {
		type: Number,
		default: 0,
	},
	eyeradius_0_inner_0: {
		type: Number,
		default: 0,
	},
	eyeradius_0_inner_1: {
		type: Number,
		default: 0,
	},
	eyeradius_0_inner_2: {
		type: Number,
		default: 0,
	},
	eyeradius_0_inner_3: {
		type: Number,
		default: 0,
	},
	eyeradius_1_outer_0: {
		type: Number,
		default: 0,
	},
	eyeradius_1_outer_1: {
		type: Number,
		default: 0,
	},
	eyeradius_1_outer_2: {
		type: Number,
		default: 0,
	},
	eyeradius_1_outer_3: {
		type: Number,
		default: 0,
	},
	eyeradius_1_inner_0: {
		type: Number,
		default: 0,
	},
	eyeradius_1_inner_1: {
		type: Number,
		default: 0,
	},
	eyeradius_1_inner_2: {
		type: Number,
		default: 0,
	},
	eyeradius_1_inner_3: {
		type: Number,
		default: 0,
	},
	eyeradius_2_outer_0: {
		type: Number,
		default: 0,
	},
	eyeradius_2_outer_1: {
		type: Number,
		default: 0,
	},
	eyeradius_2_outer_2: {
		type: Number,
		default: 0,
	},
	eyeradius_2_outer_3: {
		type: Number,
		default: 0,
	},
	eyeradius_2_inner_0: {
		type: Number,
		default: 0,
	},
	eyeradius_2_inner_1: {
		type: Number,
		default: 0,
	},
	eyeradius_2_inner_2: {
		type: Number,
		default: 0,
	},
	eyeradius_2_inner_3: {
		type: Number,
		default: 0,
	},
});

const ColorValuesSchema = new mongoose.Schema({
	selectedPatternColor: {
		type: String,
		default: '',
	},
	selectedEyeColor: {
		type: String,
		default: '',
	},
	selectedEyeColor2: {
		type: String,
		default: '',
	},
	selectedBackgroundColor: {
		type: String,
		default: '',
	},
	eyeHasBlack: {
		type: Boolean,
		default: false,
	},
});

const QRSchema = new mongoose.Schema(
	{
		store: {
			type: Schema.Types.ObjectId,
			ref: 'Stores',
		},
		uploadedImage: {
			type: String,
			default: '',
		},
		uploadedImageWidth: {
			type: Number,
			default: 0,
		},
		uploadedImageHeight: {
			type: Number,
			default: 0,
		},
		uploadedImagePadding: {
			type: Number,
			default: 0,
		},
		selectedDataPattern: {
			type: String,
			default: '',
		},
		selectedEyePattern: {
			type: String,
			default: '',
		},
		eyeCustomRadius: [eyeCustomRadius],
		colorValues: [ColorValuesSchema],
	},
	{
		collection: 'qr_custom',
	},
);

export default mongoose.model('QR_Custom', QRSchema);
