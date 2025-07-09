const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: "dv21hnzxg",
    api_key : '818684361797588',
    api_secret : 'L8RRULLE-2WboeAh4dJnvwsT7ps'
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto'
    })

    return result;
}

const upload = multer({storage});


module.exports = {upload, imageUploadUtil}