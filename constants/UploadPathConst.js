const uploadPath = 'storage/public/';

module.exports = {
    userImage: `${uploadPath}users/`,
    storeImage: `${uploadPath}stores/`,

    getImagePath: (image, path) => {
        if (image) {
            var imagePath = path.replace('storage/', '');
            return process.env.APP_URL + imagePath + image;
        }
        return null;
    }
};