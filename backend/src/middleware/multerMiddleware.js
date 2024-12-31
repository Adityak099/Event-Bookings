import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    const userId = req.body.userId || req.user?.id || "unknownUser";
    const timestamp = Date.now();
    const extension = path.extname(file.originalname); // Get file extension
    const originalName = path
      .basename(file.originalname, extension)
      .replace(/\s+/g, "_");
    cb(null, `${userId}-${originalName}-${timestamp}${extension}`);
  },
});

export const upload = multer({ storage });

// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
//   // filename: function (req, file, cb) {
//   //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//   //   const extension = path.extname(file.originalname);
//   //   cb(null, file.fieldname + "-" + uniqueSuffix + extension);
//   // },
// });
// export const upload = multer({ storage });
