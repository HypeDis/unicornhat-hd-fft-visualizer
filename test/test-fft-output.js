
const UnicornHatHD = require('unicornhat-hd');
const {FFT, Oscillator} = require('dsp.js');
const Speaker = require('speaker');

const unicornHat = new UnicornHatHD('/dev/spidev0.0');

const UnicornHD_FFT = require('./../LED-Output/UnicornHD-FFT.js')


const bands = 16;

let LED = new UnicornHD_FFT(bands); 

const speaker = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});

const size = {x:16, y:16};

//setting up the data for unicornhat
const bufferSize = 2048; 
const bufferLog = Math.log(bufferSize/2)/Math.log(size.x); //2^bufferPower = bufferSize/2
const bandIncrement = bufferLog/size.x; //2^freqIncrement*currentBand = bands frequency range
// console.log(bandIncrement);
const bandArray = [] 
for (let i = 0; i < bands; i++){
    bandArray.push(Math.pow(size.x,(i+1)*bandIncrement));
}
// console.log('bandArray',bandArray);

const roundedBandArray = []
for (let i = 0; i < bands; i++){
     roundedBandArray.push(Math.trunc(bandArray[i]));
    
};
// console.log('roundedArray',roundedBandArray);

const amplitude = 130; //need to figure out this value for streaming audio this is not db
// console.log('amplitude', amplitude);
const normalizer = amplitude/size.y;
const frequency = Math.floor(Math.random()*20000);
// console.log('frequency',frequency);

let osc = new Oscillator('SINE', 440, amplitude, bufferSize, 44100);
osc.generate();
let signal = osc.signal;
// console.log(signal);
let fft = new FFT(bufferSize, 44100);
fft.forward(signal);
let spectrum = fft.spectrum;
// console.log(spectrum.length);

 const bandAverage = []; //find the rms value of each band
for(let i = 0; i < roundedBandArray.length; i++){
    let range = 0;
    if(i === 0){
        range = roundedBandArray[0]; 
    } else {
        range = roundedBandArray[i] - roundedBandArray[i-1];
    }
    if(range <= 1){
        bandAverage[i]=spectrum[i];
    } else if(range > 1){
        let sum = 0;
        for(let j = roundedBandArray[i] - range; j < roundedBandArray[i]; j++){
            // if(spectrum[j]>currentSpectrum){
                sum += Math.pow(spectrum[j],2); 
            // }
        }
        let rms = Math.sqrt(sum)
        bandAverage[i] = rms;
        // bandAverage[i] = sum/range;
    }
    
} 

const logBase = Math.pow(amplitude,1/size.y)
// console.log('log base', logBase);
// console.log(bandAverage);
const normalizedArray = [];
for (let n = 0; n < size.x; n++){
    normalizedVal = Math.round(Math.log(bandAverage[n])/Math.log(logBase));
    if(normalizedVal < 0){
        normalizedVal = 0;
    }
    normalizedArray[n] = normalizedVal;
}
console.log(normalizedArray); 

// console.log(signal.length);



LED.setBrightness(0.4);


function randomInt() {
    return Math.floor(Math.random()*(size.y-4)+4);
};

function randomArray() {
    let arr = [];
    for(let arrPos = 0; arrPos < bands; arrPos++){
        arr.push(randomInt()); 
    }
    return arr;
}

 
// let randomLoop = setInterval(() => {
//     LED.displayOut(randomArray());
// } , 100 );  

// function killRandomLoop(){  
//     clearInterval(randomLoop);
//     LED.off();
// }

// setTimeout(() => {killRandomLoop()}, 10000);//kill random loop

LED.displayOut(normalizedArray);//need to make this async so unicorn.show only after normalized array is passed in
unicornHat.show();