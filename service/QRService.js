import QRModel from '../models/QR.js';

export const create = async (storeId, qr_custom) => {
	let existingQR = await QRModel.findOne({ store: storeId });

	if (existingQR) {
		existingQR.uploadedImage = qr_custom.uploadedImage;
		existingQR.uploadedImageWidth = qr_custom.uploadedImageWidth;
		existingQR.uploadedImageHeight = qr_custom.uploadedImageHeight;
		existingQR.uploadedImagePadding = qr_custom.uploadedImagePadding;
		existingQR.selectedDataPattern = qr_custom.selectedDataPattern;
		existingQR.selectedEyePattern = qr_custom.selectedEyePattern;
		existingQR.eyeCustomRadius = qr_custom.eyeCustomRadius;
		existingQR.colorValues = qr_custom.colorValues;
		await existingQR.save();
		return { qr_custom: existingQR };
	}
	const createdQR = await QRModel.create({
		store: storeId,
		uploadedImage: qr_custom.uploadedImage,
		uploadedImageWidth: qr_custom.uploadedImageWidth,
		uploadedImageHeight: qr_custom.uploadedImageHeight,
		uploadedImagePadding: qr_custom.uploadedImagePadding,
		selectedDataPattern: qr_custom.selectedDataPattern,
		selectedEyePattern: qr_custom.selectedEyePattern,
		eyeCustomRadius: qr_custom.eyeCustomRadius,
		colorValues: qr_custom.colorValues,
	});

	return { qr_custom: createdQR };
};

export const getQR = async (storeId) => {
	const candidate = await QRModel.findOne({ store: storeId });
	if (!candidate) {
		return [];
	}
	return candidate;
};
