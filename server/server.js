


const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  multer = require('multer'),
  bodyParser = require('body-parser');


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
});

let upload = multer({
  storage: storage
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// app.get('/api', function (req, res) {
//   res.end('File catcher');
// });

// POST File
app.post('/api/upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
});

//Start server...
app.listen(3000, () => {
  console.log('App listening on port : 3000');
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
