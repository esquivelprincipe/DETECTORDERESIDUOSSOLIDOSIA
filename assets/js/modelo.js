// Video
let video;
// For displaying the label
let label = "esperando...";
// The classifier
let classifier, img, input;
let modelURL = 'https://teachablemachine.withgoogle.com/models/PhVvMIwXp/';

// STEP 1: Load the model!
function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
}

input = createFileInput(handleFile);
function handleFile(file) { 
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}


function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify!
function classifyVideo() {
    classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  
  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

  let emoji = "🕖";
  if (label == "PAPEL Y CARTON") {
    emoji = "📦📃";
  } else if (label == "VIDRIO") {
    emoji = "🍾🥂";
  } else if (label == "RESIDUOS BIOCONTAMINADOS") {
    emoji = "☣";
  } else if (label == "ORGANICO") {
    emoji = "🍍🍎🍓🍇";
  } else if (label == "PLASTICO") {
    emoji = "🛍️";
  }

  // Draw the emoji
  textSize(256);
  text(emoji, width / 2, height / 2);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}
