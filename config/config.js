const size = {
    x: 16,
    y: 16
}
const sampleRate = 44100;
const bufferSize = Math.pow(2, 12);
const amplitude = 2400;

const color = {
    green: {
        r: 0,
        g: 255,
        b: 0
    },
    red: {
        r: 255,
        g: 0,
        b: 0
    },
    yellow: {
        r: 255,
        g: 255,
        b: 0
    },
    aqua: {
        r: 25,
        g: 255,
        b: 188
    },
    pastel_yellow: {
        r: 255,
        g: 255,
        b: 50
    },
    purple: {
        r: 255,
        g: 51,
        b: 221
    }
};

const bands = 16;

module.exports = { size, size, sampleRate, bufferSize, amplitude, color, bands };