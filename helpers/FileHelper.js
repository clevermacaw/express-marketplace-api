var fs = require('fs');
var path = require('path');

const uploadFile = (file, uploadPath, key='') => {
	if (!file) {
		return null;
	}

	var ext = path.extname(file.name);
	if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
		throw new Error('Invalid file extension');
	}

	if (getFileSize(file.path) > 2048) {
		throw new Error('File size should not more than 2MB');
	}

	if (!fs.existsSync(uploadPath)) {
		fs.mkdirSync(uploadPath, { recursive: true });
	}

	var timestamp = Date.now();
	var fileName = timestamp + key + ext;
	var newPath = path.join(uploadPath + fileName);
	var data = fs.readFileSync(file.path);
	fs.writeFileSync(newPath, data);

	return fileName;
}

const removeFile = (filePath) => {
	if (filePath) {
		fs.unlinkSync(filePath);
	}
}

const getFileSize = (filePath) => {
	var stats = fs.statSync(filePath);
	return stats.size;
}

module.exports = { uploadFile, removeFile }