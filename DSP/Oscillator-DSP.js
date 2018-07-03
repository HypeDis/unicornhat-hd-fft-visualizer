//inputs needed:
//waveform
//frequency
//amplitude
const { FFT, Oscillator } = require('dsp.js');

const { size, sampleRate, bufferSize, amplitude, bands } = require('./../config/config.js');
const { roundedBandArray } = require('./Initialize-Graph.js');

// console.log(roundedBandArray);

function oscillatorFFT(frequency, type) {

    let osc = new Oscillator(type, frequency, amplitude, bufferSize, 44100);
    osc.generate();
    let signal = osc.signal;
    // console.log(signal);
    let fft = new FFT(bufferSize, 44100);
    fft.forward(signal);
    let spectrum = fft.spectrum;
    // console.log(spectrum.length);

    const bandAverage = []; //find the rms value of each band
    for (let i = 0; i < bands; i++) {
        let range = 0;
        if (i === 0) {
            range = roundedBandArray[0];
        } else {
            range = roundedBandArray[i] - roundedBandArray[i - 1];
        }
        let sum = 0;
        for (let j = roundedBandArray[i] - range; j < roundedBandArray[i]; j++) {
            // if(spectrum[j]>currentSpectrum){
            sum += Math.pow(spectrum[j], 2); //sum the squared
            // }
        }
        let rms = Math.sqrt(sum)
        bandAverage[i] = rms;

    }
    const logBase = Math.pow(amplitude, 1 / size.y)
    // console.log('log base', logBase);
    // console.log(bandAverage);
    const normalizedArray = [];
    for (let n = 0; n < size.x; n++) {
        normalizedVal = Math.round(Math.log(bandAverage[n]) / Math.log(logBase));
        if (normalizedVal < 0) {
            normalizedVal = 0;
        }
        normalizedArray[n] = normalizedVal;
    }
    console.log(normalizedArray);
}

module.exports = oscillatorFFT;
// let oscillationLoop = setInterval(() => {
//     oscillatorFFT(Math.floor(Math.random() * 18000), 'SAW');
// }, 50);

// setTimeout(() => { clearInterval(oscillationLoop) }, 2000);