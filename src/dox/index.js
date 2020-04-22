/* Tabular Rasa JS DOX
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
* @module tabularrasa/dox
*/


import * as url from "./url";
import * as file from "./file";

// load html from url and insert to target
function load_inner_html(uri,target) {
    load_data(uri, function(e){
        target.innerHTML = e;
        exec_js(target);
        cTagLoader.forEach(l => l.load(target) );
        cCodeView.forEach(l => l.update(target) );
        cCalcValues.forEach(l => l.update(target) );
        if (typeof MathJax != "undefined") 
            MathJax.typeset();
    });
};

function exec_js(Elem){
    var elem = Elem.querySelectorAll('SCRIPT');
    elem.forEach( function(e) {
        if(e.src != "") {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", e.src, false);  // synchronous request
            xhr.send(null);
            e.innerText = xhr.responseText;
        }
        eval.call(window,e.innerText);
    });
}

// load data from url and pass to callback
function load_data(uri,Cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4){
            if (xhr.status == 200) {
                Cb(xhr.responseText);
            } else {
                console.log("Error: ("+xhr.status+")");
            }
        }
    };
    xhr.open('GET', uri, true);
    xhr.send();
};

class Router {
    constructor(tag = "hash-router"){
        this.tag = tag;
        this.target = document.querySelector('['+tag+']');
        this.get_url();

        window.onhashchange = this.get_url.bind(this);
    }

    get_url() {
        var map = url.hash_map(window.location);
        var uri = (map[this.tag])? map[this.tag] : this.target.getAttribute(this.tag);
        console.log("URL:" + uri);
        load_inner_html(uri,this.target);
    }
} 

const cTagLoader = [];
class TagLoader {
    constructor(target = document, tag = "html-data"){
        this.tag = tag;
        cTagLoader.push(this);
        this.load(target);
    }

    load(target = document) {
        var i, elem, uri, elems = target.querySelectorAll('['+this.tag+']');
        for ( i=0; i<elems.length; i++ ){
            elem = elems[i];
            uri = elem.getAttribute(this.tag);
            load_inner_html(uri,elem)
        }
    }
}

const cCodeView = [];
class CodeView {
    constructor(target = document, tag = "script"){
        this.tag = tag;
        cCodeView.push(this);
        this.update(target);
    }

    update(target = document){
        var i, elem, id, elems = target.querySelectorAll('code['+this.tag+']');
        for ( i=0; i<elems.length; i++ ){
            elem = elems[i];
            id = elem.getAttribute(this.tag);
            elem.innerText = document.getElementById(id).innerText;
        }
    }
};

const cCalcValues = [];
class CalcValues{
    constructor(target = document, tag = "calc"){
        this.tag = tag;
        cCalcValues.push(this);
        this.update(target);
    }

    update(target = document){
        var i, elem, val, elems = target.querySelectorAll('code['+this.tag+']');
        for ( i=0; i<elems.length; i++ ){
            elem = elems[i];
            val = elem.getAttribute(this.tag);
            elem.innerHTML = eval.call(window,val);
        }
    }
}

export {
    //file,
    Router,
    TagLoader,
    CodeView,
    CalcValues,
    url,
    file
};
