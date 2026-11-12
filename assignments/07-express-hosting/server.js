import express from "express";
// create express app
let app = express();

// set the port for the server
const port = process.env.PORT || 3001;

// send files in the public folder to the browser
app.use(express.static("public"));

// start server
app.listen(port, ()=> {
    console.log("Server is running on port" + port);
})