// creates a logarithmic frequency table for use with dsp functions

const { size, sampleRate, bufferSize, amplitude, bands } = require('./../config/config.js');

const bufferLog = Math.log(bufferSize / 2) / Math.log(bands);
const bandIncrement = bufferLog / bands; //2^freqIncrement*currentBand = bands frequency range

const bandArray = []
for (let i = 0; i < bands; i++) { //splits the frequency bands logarithmically based on number of bands available.
    bandArray.push(Math.pow(bands, (i + 1) * bandIncrement));
}


const roundedBandArray = []
for (let i = 0; i < bands; i++) {  //rounds the bandArray values 
    roundedBandArray.push(Math.trunc(bandArray[i]));

};
// const sampleRangeArray = [];
// for (let i = 0; i < bands; i++) {
//     if (i === 0) {
//         sampleRangeArray[0] = roundedBandArray[0];
//     } else {
//         sampleRangeArray[i] = roundedBandArray[i] - roundedBandArray[i - 1];
//     }
// };
// console.log(sampleRangeArray);
module.exports = { roundedBandArray };