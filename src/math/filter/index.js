/* Tabular Rasa JS Math Filter
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module math/filter
*/



class RFFT {
    constructor(size){
        this.size = size;
        if ((size & (size - 1)) == 0) {
            this.mode='Cooley-Tukey';
            this.p_radix2(size);
        } else {
            this.mode='Bluestein';
            this.p_bluestein(size);
        }  
    }

    new_complx() {
        return Array(2*(this.size/2+1));
    }

    fft(out,inp){
        if( inp.length != this.size || out.length != 2*(inp.length/2+1))
            return "Error: size does not match";

        if(this.mode='Cooley-Tukey'){
            
        } else if(this.mode='Bluestein'){

        } else return "Error: unkown alg. "+this.mode;

        return  0;
    }

    ifft(out,inp) {
        if( out.length != this.size || inp.length != 2*(out.length/2+1))
            return "Error: size does not match";

        if(this.mode='Cooley-Tukey'){

        } else if(this.mode='Bluestein'){

        } else return "Error: unkown alg. "+this.mode;

        return  0;
    }

    //prepare radix-2
    p_radix2(size){
        // Trigonometric tables
	    this.cosTable = new Array(size / 2);
	    this.sinTable = new Array(size / 2);
	    for (var i = 0; i < size / 2; i++) {
		    this.cosTable[i] = Math.cos(2 * Math.PI * i / size);
		    this.sinTable[i] = Math.sin(2 * Math.PI * i / size);
	    }
    }

    //prepare bluestein
    p_bluestein(size){
        this.cosTable = new Array(size);
	    this.sinTable = new Array(size);
	    for (var i = 0; i < size; i++) {
		    var j = i * i % (size * 2);  
		    this.cosTable[i] = Math.cos(Math.PI * j / size);
		    this.sinTable[i] = Math.sin(Math.PI * j / size);
	    }
    }

    //perform radix 2 Cooley-Tukey DFT
    radix2(data){
        //radix 2
        for (var i = 0; i < this.size; i++) {
            var j = reverse_bits(i, levels);
            if (j > i) {
                var temp = real[i];
                real[i] = real[j];
                real[j] = temp;
                temp = imag[i];
                imag[i] = imag[j];
                imag[j] = temp;
            }
        }

        // Cooley-Tukey DFT
	    for (var size = 2; size <= this.size; size *= 2) {
	    	var halfsize = size / 2;
	    	var tablestep = this.size / size;
	    	for (var i = 0; i < this.size; i += size) {
	    		for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
	    			var l = j + halfsize;
	    			var tpre =  real[l] * this.cosTable[k] + imag[l] * this.sinTable[k];
	    			var tpim = -real[l] * this.sinTable[k] + imag[l] * this.cosTable[k];
	    			real[l] = real[j] - tpre;
	    			imag[l] = imag[j] - tpim;
	    			real[j] += tpre;
	    			imag[j] += tpim;
	    		}
	    	}
        }   
    }   
}

// Helper
// reverse helper
function reverse_bits(x, bits) {
    var y = 0;
    for (var i = 0; i < bits; i++) 
        y = (y << 1) | (x & 1), x >>>= 1;
    return y;
}

//Array of zeros
function new_array_0(n) {
	var r = new Array(n);
	for (var i = 0; i < n; i++)
		r[i] = 0.0;
	return r;
}

//////////////////////////// END



function fft_radix2(real, imag) {
	// Length variables
	var n = real.length;
	if (n != imag.length)
		throw "Mismatched lengths";
	if (n == 1)  // Trivial transform
		return;
	var levels = -1;
	for (var i = 0; i < 32; i++) {
		if (1 << i == n)
			levels = i;  // Equal to log2(n)
	}
	if (levels == -1)
		throw "Length is not a power of 2";
	
	// Trigonometric tables
	var cosTable = new Array(n / 2);
	var sinTable = new Array(n / 2);
	for (var i = 0; i < n / 2; i++) {
		cosTable[i] = Math.cos(2 * Math.PI * i / n);
		sinTable[i] = Math.sin(2 * Math.PI * i / n);
	}
	
	// Bit-reversed addressing permutation
	for (var i = 0; i < n; i++) {
		var j = reverseBits(i, levels);
		if (j > i) {
			var temp = real[i];
			real[i] = real[j];
			real[j] = temp;
			temp = imag[i];
			imag[i] = imag[j];
			imag[j] = temp;
		}
	}
	
	// Cooley-Tukey decimation-in-time radix-2 FFT
	for (var size = 2; size <= n; size *= 2) {
		var halfsize = size / 2;
		var tablestep = n / size;
		for (var i = 0; i < n; i += size) {
			for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
				var l = j + halfsize;
				var tpre =  real[l] * cosTable[k] + imag[l] * sinTable[k];
				var tpim = -real[l] * sinTable[k] + imag[l] * cosTable[k];
				real[l] = real[j] - tpre;
				imag[l] = imag[j] - tpim;
				real[j] += tpre;
				imag[j] += tpim;
			}
		}
	}
}


function transformBluestein(real, imag) {
	// Find a power-of-2 convolution length m such that m >= n * 2 + 1
	var n = real.length;
	if (n != imag.length)
		throw "Mismatched lengths";
	var m = 1;
	while (m < n * 2 + 1)
		m *= 2;
	
	// Trignometric tables
	var cosTable = new Array(n);
	var sinTable = new Array(n);
	for (var i = 0; i < n; i++) {
		var j = i * i % (n * 2);  // This is more accurate than j = i * i
		cosTable[i] = Math.cos(Math.PI * j / n);
		sinTable[i] = Math.sin(Math.PI * j / n);
	}
	
	// Temporary vectors and preprocessing
	var areal = newArrayOfZeros(m);
	var aimag = newArrayOfZeros(m);
	for (var i = 0; i < n; i++) {
		areal[i] =  real[i] * cosTable[i] + imag[i] * sinTable[i];
		aimag[i] = -real[i] * sinTable[i] + imag[i] * cosTable[i];
	}
	var breal = newArrayOfZeros(m);
	var bimag = newArrayOfZeros(m);
	breal[0] = cosTable[0];
	bimag[0] = sinTable[0];
	for (var i = 1; i < n; i++) {
		breal[i] = breal[m - i] = cosTable[i];
		bimag[i] = bimag[m - i] = sinTable[i];
	}
	
	// Convolution
	var creal = new Array(m);
	var cimag = new Array(m);
	convolveComplex(areal, aimag, breal, bimag, creal, cimag);
	
	// Postprocessing
	for (var i = 0; i < n; i++) {
		real[i] =  creal[i] * cosTable[i] + cimag[i] * sinTable[i];
		imag[i] = -creal[i] * sinTable[i] + cimag[i] * cosTable[i];
	}
}


/* 
 * Computes the circular convolution of the given real vectors. Each vector's length must be the same.
 */
function convolveReal(x, y, out) {
	var n = x.length;
	if (n != y.length || n != out.length)
		throw "Mismatched lengths";
	convolveComplex(x, newArrayOfZeros(n), y, newArrayOfZeros(n), out, newArrayOfZeros(n));
}


/* 
 * Computes the circular convolution of the given complex vectors. Each vector's length must be the same.
 */
function convolveComplex(xreal, ximag, yreal, yimag, outreal, outimag) {
	var n = xreal.length;
	if (n != ximag.length || n != yreal.length || n != yimag.length
			|| n != outreal.length || n != outimag.length)
		throw "Mismatched lengths";
	
	xreal = xreal.slice();
	ximag = ximag.slice();
	yreal = yreal.slice();
	yimag = yimag.slice();
	transform(xreal, ximag);
	transform(yreal, yimag);
	
	for (var i = 0; i < n; i++) {
		var temp = xreal[i] * yreal[i] - ximag[i] * yimag[i];
		ximag[i] = ximag[i] * yreal[i] + xreal[i] * yimag[i];
		xreal[i] = temp;
	}
	inverseTransform(xreal, ximag);
	
	for (var i = 0; i < n; i++) {  // Scaling (because this FFT implementation omits it)
		outreal[i] = xreal[i] / n;
		outimag[i] = ximag[i] / n;
	}
}


