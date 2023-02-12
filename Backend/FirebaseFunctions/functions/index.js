const functions = require("firebase-functions");
const vision = require('@google-cloud/vision');
const admin = require('firebase-admin');
const path = require('path');
const os = require('os');
const fs = require('fs');
admin.initializeApp();

const db = admin.firestore();

function lin_func(params,x){
    return params.a*x+params.b;
}

function get_lin_param(p1,p2){
    var a = (p2.y-p1.y)/(p2.x-p1.x);
    var b = p1.y - p1.x*a;
    return {'a': a, 'b': b};
}

function is_in_line(top_line_params, bottom_line_params, point){
    const t = 0.005;
    let top_line_y = lin_func(top_line_params, point.x);
    let bottom_line_y = lin_func(bottom_line_params, point.x);
    let distance = (point.y-bottom_line_y)/bottom_line_y;

    const d_line = 0.02
    //Distance relative to line limit
    //Negative = Inside
    //Positive = Outside
    //Closer to 0 = better]
    let result = top_line_y*(1-t) <= point.y && point.y <= bottom_line_y*(1+t) && -d_line <= distance && distance <= d_line; 
    return {'include': result, 'distance': distance};

}

function analyse_json(photo_json){
    // Returns sorte list of most probably receipt totals
    // List sorted descending
    // const photo_json = require('./test_data.json');
    var possibilities = [];
    for(var i = 1; i < photo_json.length; i++){
        let line = photo_json[i];
        if(line.description.toLowerCase() == 'total'){
            points = line.boundingPoly.vertices;
            var upper_line_params = get_lin_param(points[0], points[1]);
            var lower_line_params = get_lin_param(points[2], points[3]);
            possibilities.push([upper_line_params,lower_line_params]);
        }
    }
    var results = [];
    for(var i = 1; i < photo_json.length; i++){
        let line = photo_json[i];
        for(var z in possibilities){
            var possibility = possibilities[z];
            var is_inside = is_in_line(possibility[0],possibility[1], line.boundingPoly.vertices[3]);
            if(is_inside.include){
                let x = parseFloat(line.description);
                if(x){
                    results.push([x,is_inside.distance]);
                }
            }
        }
    }
    results.sort((a,b) => {return b[0] > a[0];});
    return results;
}

async function query_picture(filePath){
    const client = new vision.ImageAnnotatorClient({
        keyFilename: "API_Keys2.json"
    });
    // Performs label detection on the image file
    try{
        filePath = "123xyz/B54F99BB-B9F6-47DB-94D5-A686497A58B6.jpg";
        const [result] = await client.textDetection(`gs://receiptmanager10.appspot.com/${filePath}`);
        const detections = result.textAnnotations;
        let values = analyse_json(detections);
        return values;
    }
    catch(err){
        console.log(err);
    }

    
}

exports.readReceipt = functions.firestore
  .document('transactions/{docId}')
  .onCreate(async (snap, context) => {
    const newValue = snap.data();
    if(newValue.isPicture){
        // const filePath = newValue.imageUrl;
        const filePath = newValue.filePath;
        //Download and process picture
        const values = await query_picture(filePath);

        //Save information into transaction
        let document = db.collection("transactions").doc(snap.id);
        let valuesStructure = values.map((arr) => {
            return {value: arr[0], p: arr[1]}
        });

        if(values != []){
            document.update({
                foundTotal: true,
                amountPossibilities: valuesStructure,
                amount: valuesStructure[0].value
            })
        }
        else{
            document.update({
                foundTotal: false
            })
        }

    }
  });

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     const filePath = "123xyz/B54F99BB-B9F6-47DB-94D5-A686497A58B6.jpg";
    
//     response.send("Hello from Firebase!");

// });
