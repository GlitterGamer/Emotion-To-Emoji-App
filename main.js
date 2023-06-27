prediction1= ""
prediction2= ""

Webcam.set({
    width: 340,
    height: 250,
    image_format: 'png',
    png_quality: 90
});

camera= document.getElementById("camera")
Webcam.attach("#camera")

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("selfieImage").src=data_uri
    })
}

console.log('ml5 version', ml5.version)
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RoIoTW1gZ/model.json", modelLoaded)
function modelLoaded(){
    console.log("model is loaded")
}

function speak(){
    synth= window.speechSynthesis
    speakData1= "first prediction is"+ prediction1
    speakData2= "second prediction is"+ prediction2
    utterThis= new SpeechSynthesisUtterance(speakData1 + speakData2)
    synth.speak(utterThis)
}

function identifyImage(){
    img= document.getElementById("selfieImage")
    classifier.classify(img, gotResult)
}

function gotResult(error, results){
    if (error) {
        console.error(error)
    } else{
        console.log(results)
        document.getElementById("result1").innerHTML= results[0].label
        document.getElementById("result2").innerHTML= results[1].label
        prediction1= results[0].label
        prediction2= results[1].label
        speak()
        if (results[0].label== "Happy") {
            document.getElementById("emoji1").innerHTML= "&#128522;"
        }
        if (results[0].label== "Sad") {
            document.getElementById("emoji1").innerHTML= "&#128532;"
        }
        if (results[0].label== "Angry") {
            document.getElementById("emoji1").innerHTML= "&#128548;"
        }
        if (results[0].label== "Confused") {
            document.getElementById("emoji1").innerHTML= "&#128533;"
        }

        if (results[1].label== "Happy") {
            document.getElementById("emoji2").innerHTML= "&#128522;"
        }
        if (results[1].label== "Sad") {
            document.getElementById("emoji2").innerHTML= "&#128532;"
        }
        if (results[1].label== "Angry") {
            document.getElementById("emoji2").innerHTML= "&#128548;"
        }
        if (results[1].label== "Confused") {
            document.getElementById("emoji2").innerHTML= "&#128533;"
        }
    }
}