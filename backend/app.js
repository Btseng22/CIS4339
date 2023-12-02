// This is the main file for the backend

// import functionalities
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const multer = require('multer'); // multer handles file uploads
const fs = require('fs');

// defining the directory where the uploaded files are stored
const uploadDir = path.join(__dirname, 'uploads');

const cors = require("cors");
// allow using a .env file
require("dotenv").config(); //require the dotenv

// creates a new instance of express application
const app = express();

mongoose.connect('mongodb+srv://admin:admin321!@cluster0.mshnju9.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });

// add cors header to the server
app.use(
    cors({
        origin: "*",
    })
);

// suppress mongoose warning to prepare for new version
mongoose.set("strictQuery", false);

// sets up mongoose for the mongoDB connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connection Success!");
    })
    .catch((err) => {
        console.error("Mongo Connection Error", err);
    });

// declare port number for the api
const PORT = process.env.PORT || 4000;

// setup and access request body
app.use(express.json());
app.use(morgan("dev"));
// express middleware to handle URL-encoded form data
app.use(express.urlencoded({ extended: true}));

// setup middle ware for routes
app.use("/clients", require("./routes/clients"));
app.use("/events", require("./routes/events"));
app.use("/org", require("./routes/org"));
app.use("/services", require("./routes/services"));
app.use("/users", require("./routes/users"));

// define storage settings for multer
const storage = multer.diskStorage({
    // specifying the destination for the uploads
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // 'uploads' is the folder where files will be stored in
    },
    // Defines how the uploaded file will be named
    filename: (req, file, cb) => {
        cb(null, file.originalname); // keeping the original filename
    },
});

// create multer instance with the specified storage settings
const upload = multer({storage: storage});
// set up a static route to serve uploaded files from the 'uploads' folder
app.use('/backend/uploads', express.static('uploads'));
// handle the POST request to the '/backend/uploads' endpoint
app.post('/backend/uploads', upload.single('file'), (req, res) => {
    // returns the response when uploaded successfully
    res.send('File uploaded successfully!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// error handler
app.use(function (err, req, res, next) {
    // logs error and error code to console
    console.error(err.message, req);
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).send(err.message);
});

// handles the deletion of profile photo
app.delete('/backend/uploads/:filename', (req, res) =>{
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);

    // checks if the file exists
    if (fs.existsSync(filePath)){
        // deletes the file if it does
        fs.unlink(filePath, (err) => {
            if (err){
                console.error("Error deleting file:", err);
                res.status(500).json({error: "Internal Server Error"});
            }   else{
                res.json({message: "File deleted successfully"});
            }
        });
    } else {
        // 404 error, photo not found
        res.status(404).json({ error: "File not found"});
    }
});