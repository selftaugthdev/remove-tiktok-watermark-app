import express from "express";
import { config } from "dotenv";
import cors from "cors";
//import fetch from "node-fetch"; // Add this if you're using fetch in your server

config();

const app = express();

// Use CORS and JSON body parsing middleware
app.use(cors());
app.use(express.json());

const url = 'https://tiktok-download-without-watermark.p.rapidapi.com/analysis?url=https%3A%2F%2Fwww.tiktok.com%2F%40tiktok%2Fvideo%2F7232384225691880746&hd=0';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.APIKEY,
    'X-RapidAPI-Host': process.env.HOST
  }
};

app.post('/download', async (req, res) => {
    const inputVideoUrl = req.body.url; // Get the URL from the request body

    // Encode the URL
    const encodedVideoUrl = encodeURIComponent(inputVideoUrl);

    // Construct the API URL with the input video URL
    const apiUrl = `https://tiktok-download-without-watermark.p.rapidapi.com/analysis?url=${encodedVideoUrl}&hd=0`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.APIKEY,
            'X-RapidAPI-Host': process.env.HOST
        }
    };

    try {
        // Make the API call with the dynamic URL
        const response = await fetch(apiUrl, options);
        const jsonResponse = await response.json();

        // Extract the video URL or other relevant data from jsonResponse
        // ...

        // Send back the result
        res.json({ message: 'Video processed', data: jsonResponse });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while processing the video');
    }
});


/* app.get('/', async (req, res) => {
    try {
        const response = await fetch(url, options);
        const jsonResponse = await response.json();

        // Extracting the video URL
    const videoUrl = jsonResponse.data.play; // or jsonResponse.data.wmplay, depending on which is correct

        // Do something with the video URL, like sending it to the client
    res.send(`<video controls><source src="${videoUrl}" type="video/mp4"></video>`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching data');
    }
}) */

// App Listener
app.listen(9000, () => {
    console.log("Server Is Running on Port 9000")
})

