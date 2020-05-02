/* Tabular Rasa JS Data Functions
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
* @module tabularrasa/math
*/

import * as stat from "./stat/index";
import * as filter from "./filter/index";
//import * as func from "./func"
import * as solver from "./solver/index";
import * as plot from "./plot"

class Func{
    constructor(Str, Func){
        this.str = Str;
        this.func = Func;
    }

    toString() {
        return this.str;
    }

    calc(args){
        this.func.apply(this,args)
    }

    seq(start,end,step=1,offset=0){
        if (end == undefined)
            end = start,start = 0;
        var a = new Array(end-start+offset);
        for(var i=0; i<offset; i++)
            a[i] = undefined;
        for(; i<end-start+offset; i++)
            a[i] = this.func(start + i*step);
        return a; 
    }
};

function seq(start,end,step=1){
    if (end == undefined)
        end = start,start = 0;
    var a = new Array(end-start);
    for(var i=0; i<end-start; i++)
        a[i] = start + i*step;
    return a;
}


export {
    Func,
    seq,
    stat,
    filter,
    solver,
    plot
};