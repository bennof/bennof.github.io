/* Tabular Rasa JS IO Loader
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
* @module tabularrasa/io/loader
*/

import {hash_map} from "./url.js";

// load json from url and pass to callback
export function json(Url, Cb) {
    data(Url,function (e){
        Cb(JSON.parse(e));
    });
};

// load html from url and insert to target
export function html(Url,Target) {
    data(Url, function(e){
        Target.innerHTML = e;
        clean_code(Target,'clean-code');
        exec_js(Target);
        if (TagStore) tag(TagStore,Target);
    });
};

function exec_js(Elem){
    var elem = Elem.querySelectorAll('SCRIPT');
    elem.forEach(function(e) {
        eval.call(window,e.innerText);
    });
}

// load data from url and pass to callback
export function data(Url,Cb) {
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
    xhr.open('GET', Url, true);
    xhr.send();
};

export function router(Tag){ // Tag: 'tr-router'
    var Elem = document.querySelector('['+Tag+']');
    var Map = hash_map(window.location);
    var Src = (Map[Tag])? Map[Tag]+".html" : Elem.getAttribute(Tag);
    // load default
    html(Src,Elem);
    // listen for changes
    window.onhashchange = function () {
        var Map = hash_map(window.location);
        var Src = (Map[Tag])? Map[Tag]+".html" : Elem.getAttribute(Tag);
        html(Src,Elem);
    };
};

// load data once
var TagStore = null;
export function tag(Tag, Root = document) {
    var i, Elem, Url, Elems = Root.querySelectorAll('['+Tag+']');
    TagStore = Tag;
    for ( i=0; i<Elems.length; i++ ){
        Elem = Elems[i];
        Url = Elem.getAttribute(Tag);
        html(Url,Elem);
    }
};



// Create clean code
var EntityMap = {"&": "&amp;","<": "&lt;",">": "&gt;",'"': '&quot;',"'": '&#39;',"/": '&#x2F;'};
function escape_html(string) { return String(string).replace(/[&<>"'\/]/g, function (s) { return EntityMap[s]; }); };
export function clean_code(Target) {
    var i, Elem, New, CodeElems = Target.querySelectorAll('[clean-code]');
    for(i=0; i<CodeElems.length; i++) {
        Elem = CodeElems[i];
        New = escape_html(Elem.innerHTML)
        Elem.innerHTML = New;
    }
};