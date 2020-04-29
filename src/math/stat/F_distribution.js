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
* @module math/stat/F_distribution
*/

import {gamma, lngamma, gamma_inc_lower} from "gamma";


export function pdf(x,m,n) {
    return Math.pow(m,m/2)
        * Math.pow(n,n/2)
        * gamma((m+n)/2)
        / gamma((n)/2)
        / gamma((m)/2)
        * Math.pow(x,m/2-1)
        / Math.pow(m*x+n,(m+n)/2);
}

export function cdf(x,m,n) {
	return betai(0.5*m,0.5*n,n*x/(m+m*x));
}

export function q() {}

// nummerical recipies
function betai(a,b,x) {
    const SWITCH=3000;
    let bt;
	if (a <= 0.0 || b <= 0.0) return NaN;
	if (x < 0.0 || x > 1.0) return NaN;
	if (x == 0.0 || x == 1.0) return x;
	if (a > SWITCH && b > SWITCH) return betaiapprox(a,b,x);
	bt=Math.exp(lngamma(a+b)-lngamma(a)-lngamma(b)+a*Math.log(x)+b*Math.log(1.0-x));
	if (x < (a+1.0)/(a+b+2.0)) return bt*betacf(a,b,x)/a;
	else return 1.0-bt*betacf(b,a,1.0-x)/b;
}


const EPS = Number.EPSILON;
const FPMIN = Number.MIN_VALUE/EPS;

function betacf(a, b, x) {
    let m,m2, aa,c=1.0,d,del,h,
        qab=a+b, qap=a+1.0, qam=a-1.0;
    d=1.0-qab*x/qap;
    if (Math.fabs(d) < FPMIN) d=FPMIN; /// ???
    d=1.0/d;
    h=d;
    for (m=1;m<10000;m++) {
        m2=2*m;
        aa=m*(b-m)*x/((qam+m2)*(a+m2));
        d=1.0+aa*d;
        if (Math.fabs(d) < FPMIN) d=FPMIN;
        c=1.0+aa/c;
        if (Math.fabs(c) < FPMIN) c=FPMIN;
        d=1.0/d;
        h *= d*c;
        aa = -(a+m)*(qab+m)*x/((a+m2)*(qap+m2));
        d=1.0+aa*d;
        if (Math.fabs(d) < FPMIN) d=FPMIN;
        c=1.0+aa/c;
        if (Math.fabs(c) < FPMIN) c=FPMIN;
        d=1.0/d;
        del=d*c;
        h *= del;
        if (Math.fabs(del-1.0) <= EPS) break;
    }
    return h;
}

function betaiapprox(a, b, x) {
    let j, xu,t,sum,ans, a1 = a-1.0, b1 = b-1.0, 
        mu = a/(a+b), lnmu=Math.log(mu),lnmuc=Math.log(1.-mu);
    t = Math.sqrt(a*b/((a+b)*(a+b)*(a+b+1.0)));
    if (x > a/(a+b)) {
        if (x >= 1.0) return 1.0;
        xu = Math.min(1.,Math.max(mu + 10.*t, x + 5.0*t));
    } else {
        if (x <= 0.0) return 0.0;
        xu = Math.max(0.,Math.min(mu - 10.*t, x - 5.0*t));
    }
    sum = 0;
    for (j=0;j<18;j++) {
        t = x + (xu-x)*y[j];
        sum += w[j]*Math.exp(a1*(Math.log(t)-lnmu)+b1*(Math.log(1-t)-lnmuc));
    }
    ans = sum*(xu-x)*Math.exp(a1*lnmu-lngamma(a)+b1*lnmuc-lngamma(b)+lngamma(a+b));
    return ans>0.0? 1.0-ans : -ans;
}