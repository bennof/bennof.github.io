/* Tabular Rasa JS Math Statistics Gamma Function
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
* @module math/stat/gamma
*/

const EPS = Number.EPSILON;
const FPMIN = Number.MIN_VALUE/EPS;

//https://en.wikipedia.org/wiki/Lanczos_approximation
const p = [
    676.5203681218851
    ,-1259.1392167224028
    ,771.32342877765313
    ,-176.61502916214059
    ,12.507343278686905
    ,-0.13857109526572012
    ,9.9843695780195716e-6
    ,1.5056327351493116e-7
];


export function gamma(z){
    if (z < 0.5)
        return Math.PI / (Math.sin(Math.PI*z) * gamma(1-z))  // Reflection formula
    else if(z > 100) 
        return Math.exp(lngamma(z)); // https://github.com/substack/gamma.js/blob/master/index.js
    else {
        z -= 1;
        var h = 0.99999999999980993;
        for (var i = 0; i < 8; i++) 
            h += p[i] / (z + i);
        var h2 = z + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(h2, z + 0.5)
            * Math.exp(-h2) * h;
    }
}
   
// https://github.com/substack/gamma.js/blob/master/index.js
const p_ln = [
    57.156235665862923517,
    -59.597960355475491248,
    14.136097974741747174,
    -0.49191381609762019978,
    0.33994649984811888699e-4,
    0.46523628927048575665e-4,
    -0.98374475304879564677e-4,
    0.15808870322491248884e-3,
    -0.21026444172410488319e-3,
    0.21743961811521264320e-3,
    -0.16431810653676389022e-3,
    0.84418223983852743293e-4,
    -0.26190838401581408670e-4,
    0.36899182659531622704e-5
];

export function lngamma(z) {
    if(z < 0) return NaN; 
    var h = 0.99999999999999709182;
    for(var i = 0; i < 14; i++) 
        h += p_ln[i] / (z + i);
    var h2 = z + 607/128 + 0.5;
    return 0.5 * Math.log(2*Math.PI)
        +(z+.5)*Math.log(h2)-
        h2+Math.log(h)-Math.log(z);
}


// https://github.com/lh3/samtools/tree/master/bcftools

export  function gamma_inc_lower(s, z) {
    let sum = 1, h = 1;
    for (var i = 1; i < 100; i++) {
      sum += (h *= z / (s + i));
      if (x / sum < EPS) break;
    };
    return Math.exp(s * Math.log(z) - z 
        - lngamma(s + 1) + Math.log(sum));
};

export function inv_gamma_inc_lower(p, a) {
    let j, x,err,t,u,pp,lna1,afac,a1=a-1;
	gln=lngamma(a);
	if (a <= 0.) return NaN;
	if (p >= 1.) return Math.max(100.,a + 100.*Math.sqrt(a));
	if (p <= 0.) return 0.0;
	if (a > 1.) {
		lna1=Math.log(a1);
		afac = Math.exp(a1*(lna1-1.)-gln);
		pp = (p < 0.5)? p : 1. - p;
		t = Math.sqrt(-2.*Math.log(pp));
		x = (2.30753+t*0.27061)/(1.+t*(0.99229+t*0.04481)) - t;
		if (p < 0.5) x = -x;
		x = Math.max(1.e-3,a*Math.pow(1.-1.0/(9.*a)-x/(3.*Math.sqrt(a)),3));
	} else {
		t = 1.0 - a*(0.253+a*0.12);
		if (p < t) x = Math.pow(p/t,1./a);
		else x = 1.-Math.log(1.-(p-t)/(1.-t));
	}
	for (j=0;j<12;j++) {
		if (x <= 0.0) return 0.0;
		err = gamma_inc_lower(x,a) - p;
		if (a > 1.) t = afac*Math.exp(-(x-a1)+a1*(Math.log(x)-lna1));
		else t = Math.exp(-x+a1*Math.log(x)-gln);
		u = err/t;
		x -= (t = u/(1.-0.5*Math.min(1.,u*((a-1.)/x - 1))));
		if (x <= 0.) x = 0.5*(x + t);
		if (Math.fabs(t) < EPS*x ) break;
	}
	return x;
}
