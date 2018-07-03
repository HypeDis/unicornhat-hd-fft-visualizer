//require data from fft sound input algo 
//require module that outputs fft bands
//fft function should receive intensity of each band as an array
//this function should automatically split itself into the correct number of bands based on the intensity array length

//create a config file later with brightness, panel size, #of bands etc
const UnicornHatHD = require('unicornhat-hd');
const Speaker = require('speaker');
const dsp = require('dsp.js');

const unicornHat = new UnicornHatHD('/dev/spidev0.0');

const UnicornFFT = require('./LED-Output/UnicornHD-FFT.js');


let LED = new UnicornFFT();

//test if pcm data comes out of speaker npm
const speaker = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});

// unicornHat.setAll(46,46,36);
// unicornHat.show();

// LED.setBrightness(0.1);

// setTimeout(()=>{
//     LED.off();
// }, 500);

