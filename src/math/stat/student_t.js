/* Tabular Rasa JS Math Statistics Student t Distribution
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
* @module math/stat/student_t
*/

import {lngamma} from "gamma";


export function p(t, n=1) {
    let lg1 = lngamma(n / 2);
    let lg2 = lngamma((n + 1) / 2);
    return ((Math.exp(lg2 - lg1) / Math.sqrt(Math.PI * n)) 
        * Math.pow((1 + t * t / n), -(n + 1) / 2));
}

export function c(t, n=1) {
    let a, b, nmod, s, c, fk, k;
    let pii = 1 / Math.PI;
    a = t / Math.sqrt(n);
    b = n / (n + t * t);
    nmod = n % 2;
    s = 1;
    c = 1;
    fk = 2 + nmod;
    if (n-2 >= 2) {
      for (k = fk; k <= n - 2; k += 2) {
        c = c * b * (fk -1) / fk;
        s += c;
        fk += 2;
      }
    }

    if (nmod != 1) return .5 + .5 * a * Math.sqrt(b) * s;
    else {
      if (n == 1) s = 0;
      return .5 + (a * b * s + Math.atan(a)) * pii;
    };
};

export function q() {}