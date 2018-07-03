
// const UnicornHatHD = require('unicornhat-hd');
const { FFT, Oscillator } = require('dsp.js');
// const unicornHat = new UnicornHatHD('/dev/spidev0.0');

// const UnicornHD_FFT = require('./../LED-Output/UnicornHD-FFT.js')

const { size, sampleRate, bufferSize, amplitude, bands } = require('./../config/config.js');
let oscGenerator = require('./../DSP/Oscillator-DSP.js');



// let LED = new UnicornHD_FFT(bands);









// LED.setBrightness(0.4);


// function randomInt() {
//     return Math.floor(Math.random() * (size.y - 4) + 4);
// };

// function randomArray() {
//     let arr = [];
//     for (let arrPos = 0; arrPos < bands; arrPos++) {
//         arr.push(randomInt());
//     }
//     return arr;
// }


// let randomLoop = setInterval(() => {
//     LED.displayOut(randomArray());
// } , 100 );  

// function killRandomLoop(){  
//     clearInterval(randomLoop);
//     LED.off();
// }

// setTimeout(() => {killRandomLoop()}, 10000);//kill random loop

let oscillationLoop = setInterval(() => {
    oscGenerator(Math.floor(Math.random() * 18000), 'SAW')
}, 50);

setTimeout(() => { clearInterval(oscillationLoop) }, 2000);

// LED.displayOut(normalizedArray);//need to make this async so unicorn.show only after normalized array is passed in
// unicornHat.show();