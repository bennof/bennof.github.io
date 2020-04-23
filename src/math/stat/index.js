/* Tabular Rasa JS Math Statistics
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
* @module math/stat
*/

import {Func} from "../index";

const tau = 2.0 * Math.PI;
const sqrt2 = Math.sqrt(2.0);
const s2pi = Math.sqrt(tau);
const is2pi = 1.0/s2pi;


export function erf(x) {
    if( x > 0 )
        return 1-1/(1+0.278393*x+0.230389*x^2+0.000972*x^3+0.078108*x^4)^4;
    else if( x < 0 )
        return -1+1/(1-0.278393*x+0.230389*x^2-0.000972*x^3+0.078108*x^4)^4;
    else
        return 0.0;
};

export function cnorm(x, mu=0.0, sig=1.0) {
    return 0.5*(1+erf((x-mu)/sig/sqrt2))
}

export function norm(x, mu=0.0, sig=1.0) {
    return is2pi/sig*Math.exp(-0.5*((x-mu)/sig)^2);
}

export function boxmullerrand() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); 
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) 
        * Math.cos( tau * v );
}

export var dnorm = norm;
export var pnorm = cnorm;
export function rnorm(mu=0.0, sig=1.0) {
    return mu + sig * boxmullerrand();
}

//export qnorm() = //quartile function





export function floating_mean(Data, n) {
    var r = new Array(Data.length);
    var t = Math.floor((n-1)/2);
    for(var i = 0; i<t; i++)
        r[i] = undefined;
    for(; i<Data.length-t; i++){
        //calc mean
        var m = 0;
        for(var j=i-t; j<i+n-t; j++)
            m += Data[j];
        r[i] = m/n;
    }
    return r;
}


export function linear_regression(X,Y,offset=0, length){
    var xm=0, ym=0, sx=0, sx2, sy=0, sxy=0, h, g, n=0;
    if(!length) length = X.length;
    for(var i = offset; i < length; i++){
        if(X[i] && Y[i]){
            g = X[i];
            xm += g;
            sx += g*g;
            h = Y[i];
            ym += h;
            sy += h*h;
            sxy += h*g;
            n++;
        }
    }
    xm /= n;
    ym /= n;

    sx2 = sx;
    sx = sx/n-xm*xm;
    sy = sy/n-ym*ym;
    sxy = sxy/n-xm*ym;

    var a = sxy / sx, b = ym - sxy / sx * xm;
    var err = 0.0, hh;
    for(var i = offset; i < length; i++){
        if(X[i] && Y[i]){
            g = X[i];
            h = Y[i];
            hh = b + g * a;
            h = (h - hh);
            err += h*h;
        }
    }
    err = Math.sqrt(err/(n-2));

    var f = new Func("f(x)="+a.toFixed(2)+"*x+"+b.toFixed(2),function(x) {return a*x+b;});
    f.a = a;
    f.b = b;
    f.err = err;
    f.err_a = err*err/sx*n;
    f.err_b = err*err*sx2/(n*n*sx);
    return f;
}

export function exponential_regression(X, Y, offset=0, length){
    var xm=0, ym=0, sx=0, sx2, sy=0, sxy=0, h, g, n=0;
    if(!length) length = X.length;
    for(var i = offset; i < length; i++){
        if(typeof X[i] == "number" && Y[i]){
            g = X[i];
            xm += g;
            sx += g*g;
            h = Y[i];
            h = (0.0==h)?0.0 : Math.log(h);
            ym += h;
            sy += h*h;
            sxy += h*g;
            n++;
        }
    }
    xm /= n;
    ym /= n;

    sx2 = sx;
    sx = sx/n-xm*xm;
    sy = sy/n-ym*ym;
    sxy = sxy/n-xm*ym;

    var a = sxy / sx, b = ym - sxy / sx * xm;
    var err = 0.0, hh;
    for(var i = offset; i < length; i++){
        if(X[i] && Y[i]){
            g = X[i];
            h = Y[i];
            h = (0.0==h)?0.0 : Math.log(h);
            hh = b + g * a;
            h = (h - hh);
            err += h*h;
        }
    }
    err = Math.sqrt(err/(n-2));

    a = Math.exp(a), b = Math.exp(b);
    var f = new Func("f(x)=("+b.toFixed(2)+")*("+a.toFixed(2)+")^x",function(x) {return b*Math.pow(a,x);});
    f.a = a;
    f.b = b;
    f.err = err;
    f.err_a = f.a*(err*err/sx*n);
    f.err_b = f.b*(err*err*sx2/(n*n*sx));
    return f;
}
