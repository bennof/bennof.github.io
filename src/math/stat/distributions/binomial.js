/* Tabular Rasa JS Math Statistics F Distribution
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
* @module math/stat/binomial
*/

export function choose(n, k) {
    if (k > n) 
        return NaN;
    else {
        let r = 1;
        for (let i = 1; i <= k; i++) {
            r *= n--;
            r /= i;
        }
        return r
    }
};

export function pdf(k, n, p) {
    if (k < 0 || k > n) return 0
    else {
        if (p == 0) 
            return (k == 0) ? 1 : 0;
        else if (p == 1) 
            return( k == n) ? 1 : 0;
        else {
            let c = choose(n, k);
            let pows = Math.pow(p, k) * Math.pow((1-p), (n-k));
            if (c == 'Infinity') {
                if (pows == 0) return 0
                else return c;
            } else {
                return c * pows;
            }
        }
    };
}

export function cdf(k, n, p) {
    if (k < 0) return 0.0;
    else if (n < k) return 1.0;
    else 
        return Array.apply( null, 
            Array(Math.floor(k) + 1) ).map( (_, i) => {
                return choose(n, i) * Math.pow(p, i) 
                    * Math.pow(1 - p, n - i);
            }).reduce( (prev, next) => prev + next, 0 );
}

export function quantile(u,n,p) {
    let k,kl,ku,inc=1;
	if (u <= 0. || u >= 1.) return NaN;
	k = Math.max(0,Math.min(n,(Int)(n*pe)));
	if (p < cdf(k)) {
		do {
			k = Math.max(k-inc,0);
			inc *= 2;
		} while (p < cdf(k));
		kl = k; ku = k + inc/2;
	} else {
		do {
			k = Math.min(k+inc,n+1);
			inc *= 2;
		} while (p > cdf(k));
		ku = k; kl = k - inc/2;
	}
	while (ku-kl>1) {
		k = (kl+ku)/2;
		if (p < cdf(k)) ku = k;
		else kl = k;
	}
	return kl;
}

export function expected(n,p){
    return n*p;
}

export function variance(n,p){
    return Math.sqrt(n*p*(1-p));
}