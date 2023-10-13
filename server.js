// // const express = require("express");
// // const fs=require("fs");
// // // const csv = require('csv-parser');
// // // const app = express();

// // // const csvpath = "./images.csv";
// // // // const jsonpath = "./converted.json";


// // // const express = require("express");
// // // const app = express();
// // // const csvtojson = require("csvtojson");

// // // app.get('/cs', async (req, res) => {
// // //     try {
// // //         const results = await csvtojson().fromFile('/images.csv');
// // //         res.json(results);
// // //     } catch (error) {
// // //         res.status(500).send('An error occurred while processing the CSV file.');
// // //     }
// // // });

// // // app.listen(3000, () => {
// // //     console.log("Listening on port 3000");
// // // });
// // const express = require('express');
// // const multer = require('multer');
// // const upload = multer({ dest: 'uploads/' });

// // const app = express();


// // app.post('/upload', upload.single('images'), (req, res) => {

// //     const csvFilePath = req.file.path;
// //     const csvtojson = require('csvtojson');
// //     csvtojson()
// //       .fromFile(csvFilePath)
// //       .then((jsonObj) => {
// //         res.json(jsonObj); 
// //       });
// //   });
// // const port = 3000;

// // app.listen(port,()=>{
// //     console.log("listening to port no 3000")
// // })

// const path = require("path");
// const express = require("express");
// const multer = require('multer');
// const csv = require("csv-parser");
// const fs = require('fs');
// const app = express();

// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });

// app.use(express.json());

// app.post("/upload", upload.single('file'), (req, res) => {
//   const fileBuffer = req.file.buffer;
// //   const rows = [];
//   const path  = `./${req.file.originalName}`
// //   const readableStream=fs.createReadStream(path);
  

//   fs.writeFile(path, fileBuffer, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Error saving the file.");
//     }

//     const readableStream = fs.createReadStream(path);
//     const rows = [];

//     readableStream
//       .pipe(csv())
//       .on('data', (row) => {
//         console.log(JSON.stringify(row)); 
//         rows.push(row);
//       })
//       .on('end', () => {
//         res.json(rows); 
//       });
//   });

// const PORT = 3000;
// app.listen(3000, () => {
//   console.log("Listening on port 3000");
// })

// 
const express = require("express");
const multer = require('multer');
const csv = require("csv-parser");
const fs = require('fs');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

app.post("/upload", upload.single('file'), (req, res) => {
  const fileBuffer = req.file.buffer;
  const filename = `./${req.file.originalname}`;

  fs.writeFile(filename, fileBuffer, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving the file.");
    }

    const readableStream = fs.createReadStream(filename);
    const rows = [];

    readableStream
      .pipe(csv())
      .on('data', (row) => {
        console.log(JSON.stringify(row));
        rows.push(row);
      })
      .on('end', () => {
        res.json(rows);
      });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Listening on port 3000");
});