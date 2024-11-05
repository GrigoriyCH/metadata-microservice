var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();
var path = require('path');

var app = express();

// Middlewares
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// File upload setup
var upload = multer({ dest: 'uploads/' });

// Routes
app.get('/', function (req, res) {
  res.sendFile(path.join(process.cwd(), '/views/index.html'));
});

// File upload endpoint
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const { originalname, mimetype, size } = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
