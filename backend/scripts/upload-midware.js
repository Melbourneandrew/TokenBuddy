const multer = require("multer");

const fileFilter = (req, file, cb) => {
	const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
	if (!allowedTypes.includes(file.mimetype)) {
		const error = new Error("Incorrect file");
		error.code = "INCORRECT_FILETYPE";
		return cb(error, false);
	}
	cb(null, true);
};
module.exports = multer({
	storage: multer.memoryStorage(),
	fileFilter,
	limits: {
		fileSize: 12000000,
	},
});