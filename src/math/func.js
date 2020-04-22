/* Tabular Rasa JS Math Func
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
* @module io/file
*/

export class Func {
    constructor(Str, Func){
        this.str = Str;
        this.func = Func;
    }

    toString() {
        return this.str;
    }
};

export class Model extends Func {
    constructor(Str, Func){
        super(Str,Func);
    }
};

export class Linear_Model extends Model {
    // linear model f(x)=a*x+b
    constructor(X, Y, length, offset){
        if(Array.isArray(X))
            this.lin_reg(X, Y, length, offset);
        else
            this.lin_reg_idx(Y, length, offset);
        super("f(x)="+this.a.toFixed(2)+"*x+"+this.b.toFixed(2),function(x) {return this.a*x+this.b;});
    }


    lin_reg(X, Y, length, offset){
        var xm=0, ym=0, sx=0, sy=0, sxy=0, h, g;
        if (length == undefined) length = this.length;
        if (offset == undefined) offset = 0;
        for(var i = offset; i < length; i++){
            g = X[i];
            xm += g;
            sx += g*g;
            h = Y[i];
            ym += h;
            sy += h*h;
            sxy += h*g;
        }
        length -= offset;
        xm /= length;
        ym /= length;
        sx = sx/length-xm*xm;
        sy = sy/length-ym*ym;
        sxy = sxy/length-xm*ym;
        this.a = sxy/sx;
        this.b = ym-sxy/sx*xm;
    }

    lin_reg_idx(Y, length, offset){
        var xm=0, ym=0, sx=0, sy=0, sxy=0, h;
        if (length == undefined) length = this.length;
        if (offset == undefined) offset = 0;
        for(var i = offset; i < length; i++){
            xm += i;
            sx += i*i;
            h = Y[i];
            ym += h;
            sy += h*h;
            sxy += h*i;
        }
        length -= offset;
        xm /= length;
        ym /= length;
        sx = sx/length-xm*xm;
        sy = sy/length-ym*ym;
        sxy = sxy/length-xm*ym;
        this.a = sxy/sx;
        this.b = ym-sxy/sx*xm;
    }
};

export class Exponential_Model extends Model {
    constructor(X, Y, length, offset){
        super("f(x)=("+b.toFixed(2)+")*("+a.toFixed(2)+")^x", function(x)  {return this.b*Math.pow(this.a,x);})
    }

    exp_reg_idx(Y, length, offset) {
        var i, h, hh, n, a, b;
        var xm=0.0, ym=0.0, sx=0.0, sy=0.0, sxy=0.0, sx2;
        if (length == undefined) length = this.length;
        if (offset == undefined) offset = 0;

        // calc cov, var and mean
        for( i = offset; i < length; i++){
            xm += i;
            sx += i*i;
            h = Y[i];
            h = (0.0==h)?0.0 : Math.log(h);
            ym += h;
            sy += h*h;
            sxy += h*i;
        }
        n = length - offset;
        xm /= n;
        ym /= n;
        sx2 = sx;
        sx = sx/n-xm*xm;
        sy = sy/n-ym*ym;
        sxy = sxy/n-xm*ym;
        a = sxy/sx;
        b = ym-sxy/sx*xm;

        //errors
        var err = 0.0;
        for( i = offset; i < length; i++){
            h = data[i][coln];
            h = (0.0==h)?0.0 : Math.log(h);
            hh = b + i * a;
            h = (h - hh);
            err += h*h;
        }
        err = Math.sqrt(err/(n-2));
        console.log("Error: "+err);

        this.a = Math.exp(a);
        this.b = Math.exp(b);
        this.err = err;
    }
    
    get_sigma(n) {
        // apply exponential (Taylor series: e^x*delta x)
        var rr = new Func(n+" sigma", function(x){ return this.b*Math.pow(this.a,x)*(1 + this.err*this.n*Math.log(this.a)); });
        rr.a = this.a;
        rr.b = this.b;
        rr.n = n;
        rr.err = this.err;
        return rr;
    };
};



