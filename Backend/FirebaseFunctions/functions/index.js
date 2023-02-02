const functions = require("firebase-functions");
const vision = require('@google-cloud/vision');

async function quickstart() {
    const client = new vision.ImageAnnotatorClient({
        keyFilename: "API_Keys.json"
    });
    // Performs label detection on the image file
    const [result] = await client.textDetection('./testing_receipts/7.jpeg');
    const detections = result.textAnnotations;
    console.log(detections);
    console.log('Text:');
    let json = JSON.stringify(detections);
    console.log(json);
    // detections.forEach(text => console.log(text));
}

exports.helloWorld = functions.https.onRequest((request, response) => {
    quickstart();
    response.send("Hello from Firebase!");
});
