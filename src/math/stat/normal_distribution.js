/* Tabular Rasa JS Math Statistics Normal Distribution
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
* @module math/stat/normal
*/

const tau = 2.0 * Math.PI;
const sqrt2 = Math.sqrt(2.0);
const s2pi = Math.sqrt(tau);
const is2pi = 1.0/s2pi;

export function pdf (x, mu=0.0, sig=1.0) {
    return is2pi/sig*Math.exp(-0.5*((x-mu)/sig)^2);
}

export function cdf (x, mu=0.0, sig=1.0 ) {
    return 0.5*(1+erf((x-mu)/sig/sqrt2))
}

export function quantile() {
    return NaN;
}

export function expected(mu=0.0, _sig=1.0){
    return mu;
}

export function variance(_mu=0.0, sig=1.0){
    return sig*sig;
}