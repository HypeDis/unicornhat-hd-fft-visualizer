const UnicornHatHD = require('unicornhat-hd');

const unicornHat = new UnicornHatHD('/dev/spidev0.0');

const flip_horizontal = false;
const flip_vertical = true;

const color = {
    green:{
        r:0,
        g:255,
        b:0
    },
    red:{
        r:255,
        g:0,
        b:0
    },
    yellow:{
        r:255,
        g:255,
        b:0
    },
    aqua:{
        r:25,
        g:255,
        b:188
    },
    pastel_yellow: {
        r:255,
        g:255,
        b:50
    },
    purple:{
        r:255,
        g:51,
        b:221
    }
}

const size = {x:16, y:16};

function resetMatrix(color1 ,color2, color3) { //fills in all of the leds with the correct colors
    
    for(let x = 0; x < 16; x++){
        let y = 0;
        while(y < 6){ //top band
            unicornHat.setPixel(x , y, color1.r, color1.g, color1.b);
            y++;
        }
        while(y < 12){
            unicornHat.setPixel(x , y, color2.r, color2.g, color2.b);
            y++;
        }
        while(y < 16){
            unicornHat.setPixel(x , y, color3.r, color3.g, color3.b);
            y++;
        }
    }
}


function UnicornHD_FFT (bands) {
    this.bands = bands;
    this.bandWidth = size.x / bands;

    if(!Number.isInteger(this.bandWidth)){
        console.log('bandwidth is incompatible');
        return;
    }

}

UnicornHD_FFT.prototype.setBrightness = function (brightness) {
        unicornHat.setBrightness(brightness);
      
};

UnicornHD_FFT.prototype.getBrightness = function ()  {
       return unicornHat.getBrightness();
};   

UnicornHD_FFT.prototype.off = function () {
    unicornHat.clear();
    unicornHat.show( flip_horizontal, flip_vertical);
}

UnicornHD_FFT.prototype.displayOut = function (fftArr = []) {

    resetMatrix(color.aqua, color.pastel_yellow, color.purple);
    
    if(fftArr.length != this.bands){
        console.log('array size does not match bands');
        return;
    }
    
    for(let currentBand = 0; currentBand < this.bands; currentBand ++){//cycles through the bands
        let pixelRange = currentBand * this.bandWidth + this.bandWidth

        for(let pixelXPos = currentBand * this.bandWidth; pixelXPos < pixelRange; pixelXPos++ ){// cycles through each column in a band
            let barHeight = fftArr[currentBand];
            for(let y = barHeight; y < size.y; y++ ) { //clears all the unused leds
                unicornHat.setPixel(pixelXPos,y,0,0,0);
            }
            
        }
        
    }

    unicornHat.show( flip_horizontal, flip_vertical);
}

module.exports = UnicornHD_FFT;





