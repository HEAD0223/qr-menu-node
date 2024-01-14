import nodemailer from 'nodemailer';

export const sendActivationMail = async (email, password, activationLink) => {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS,
		},
	});

	// Get the current date in MM.DD format
	const currentDate = new Date().toLocaleDateString('en-US', {
		month: '2-digit',
		day: '2-digit',
	});
	const subject = `Account activation and User credentials - ${process.env.STORE_NAME} - ${currentDate}`;

	const htmlContent = `
			<p>A new account has been created.</p>
			<h5>To activate follow this link:</h5>
			<a href="${activationLink}">${activationLink}</a>
			<p>Email: <span>"${email}"</span></p>
			<p>Password: <span>"${password}"</span></p>
		 `;

	// Email content
	const mailOptions = {
		from: process.env.GMAIL_USER,
		to: email,
		subject: subject,
		text: 'A new account has been created.',
		html: htmlContent,
	};

	// Send the email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};
