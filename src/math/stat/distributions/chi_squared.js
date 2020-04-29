/* Tabular Rasa JS Math Statistics Chi Squared Distribution
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
* @module math/stat/chi_squared
*/

import {lngamma, gamma_inc_lower,inv_gamma_inc_lower} from "../gamma";



export function pdf(x, n=1) {
    if (x < 0) 
        return 0
    else if (n == 2) 
        return Math.exp(-x / 2) / 2
    else {
        return Math.exp( (n / 2 - 1) * 
            Math.log(x / 2) - x / 2 - (lngamma(n/2))) / 2;
    }
}

export function cdf(x, n=1) {
    if (x < 0) return 0.0
    else if (n == 2) return 1 - Math.exp(-x / 2)
    else return gamma_inc_lower(n / 2, x / 2)
}

export function quantile(u,n=1) {
    if (p < 0. || p >= 1.) return NaN;
	return 2.*inv_gamma_inc_lower(u,0.5*n);
}

export function expected(n=1){
    return n;
}

export function variance(n=1){
    return 2*n;
}