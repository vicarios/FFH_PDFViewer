const express = require("express");
const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public')); // Serve static files from a directory named 'public'

const fs = require('fs');
const path = require('path');

const directoryPath = __dirname + '/public/pdf'; // Replace with the path to your folder
const resultArray = [];


app.get("/", function(req, res){
    res.render("index", {resultArray, num: 6})
})

const port = 3000;

// Bind the server to your local network IP address
const networkIPAddress = '192.168.1.7'; // Replace with your local network IP address
app.listen(port, networkIPAddress, () => {
  console.log(`Server is running on http://${networkIPAddress}:${port}`);
});

// Function to recursively read the contents of a directory and store file names
function readDirectory(dir) {
    const contents = fs.readdirSync(dir);
    contents.forEach((item) => {
      const itemPath = path.join(dir, item);
      const stats = fs.statSync(itemPath);
  
      if (stats.isDirectory()) {
        // If it's a directory, recursively read its contents
        readDirectory(itemPath);
      } else {
        // If it's a file, store its name (without the path)
        resultArray.push(item);
      }
    });
  }

// Call the function to read the directory
readDirectory(directoryPath);






  
