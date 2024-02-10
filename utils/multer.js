const multer = require( 'multer' );

const storage = multer.diskStorage( {
    destination: (req, file, cb) => {
        cb( null, './uploads' );
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
} );


const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error('Unsupported Media Type. \nAllowed format: .jpeg, .png, .gif, .pdf'), false);
    }
};


const fileSize = {
    limits: 1024 * 1024 * 10,
}


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    fileSize: fileSize,
})

module.exports = upload;