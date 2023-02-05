const functions = require("firebase-functions");
const vision = require('@google-cloud/vision');


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

async function analyse_json(photo_json){
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
                console.log(line);
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

async function query_picture(){
    // const client = new vision.ImageAnnotatorClient({
//     keyFilename: "API_Keys.json"
    // });
    // // Performs label detection on the image file
    // const [result] = await client.textDetection('./testing_receipts/7.jpeg');
    // const detections = result.textAnnotations;
    // console.log(detections);
    // console.log('Text:');
    // let json = JSON.stringify(detections);
    // console.log(json);
    // detections.forEach(text => console.log(text));
    return
}

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
