/* edox
** Copyright (c) 2018-2020 Benjamin Benno Falkner
*/

/*jshint esversion: 6 */

import * as url from "./url";
import * as file from "./file";

const EDOX_ROUTER = "edox-router";
const EDOX_INCLUDE = "edox-include";
const EDOX_EDITOR = "edox-editor-r001";

/**
 * Requests an resource
 * @param {*} uri  URI to load
 * @param {*} cb   callback function on success
 */
function request(uri, cb){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4){
            if (xhr.status == 200) { cb(xhr.responseText);} 
            else { console.log("Error: ("+xhr.status+")");}
        }
    };
    xhr.open('GET', uri, true);
    xhr.send();
}

/**
 * executes all script tags
 * @param {*} target document element
 */
function exec_js(target){
    var elem = Elem.querySelectorAll('SCRIPT');
    elem.forEach( function(e) {
        if(e.src != "") {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", e.src, false);  // synchronous request
            xhr.send(null);
            e.innerText = xhr.responseText;
        }
        eval.call(window, e.innerText);
    });
} 


function new_button(text,func){
    var button = document.createElement('BUTTON');
    button.innerText = text;
    button.onclick = func;
    return button;
}


class Edox {
    constructor (target, include_tag = EDOX_INCLUDE, router_tag = EDOX_ROUTER){
        this.doc = document.querySelector(target);
        this.edit_mode = null;;
        this.show_editor = false; 

        this.includes = [];
        this.include_all(include_tag);

        this.router = this.doc.querySelector('['+router_tag+']');
        this.route();
        window.onhashchange = this.route.bind(this);
    }

    open(from){
        file.read((status,data)=>{
            if (status != 200){//error
                alert("ERROR: read file "+from+"\n"+data);
            } else {
                this.doc.innerHTML = res;
                exec_js(this.doc);
            }
        },from,"");
    }

    save(as){
        file.save(as,"text/html",this.doc.innerHTML)
    }

    include_all(tag){
        var i, elem, uri, elems = this.doc.querySelectorAll('['+tag+']');
        for ( i=0; i<elems.length; i++ ){
            elem = elems[i];
            uri = elem.getAttribute(tag);
            this.includes.push({target: elem, uri: uri});
            include(elem,uri)
        }
    }

    render(target, content) {
        target.innerHTML = content;
        exec_js(target);
    }

    include(target,uri){
        request(uri, (res) => {
            target.innerHTML = res;
            exec_js(target);
        });
    }

    route(url){
        var uri;
        if (url) {
            uri = url;
        } else {
            var map = url.hash_map(window.location);
            uri = (map[this.tag])? map[this.tag] : this.router.getAttribute(this.tag);
        }
        console.log("URL:" + uri);
        this.include(this.router,uri);
    }

    edit(target){
    }

    editor(on){
        this.show_editor = on;
        if(this.show_editor){ // editmode
            var div = document.createElement('DIV');
            div.id = EDOX_EDITOR;
            div.classList.add("editor-bottom");

            div.appendChild(new_button("+",()=>{}));
            div.appendChild(new_button("ok",()=>{}));
            
            div.appendChild(new_button("open",()=>{}));
            div.appendChild(new_button("save",()=>{}));

            document.body.appendChild(div);
            body.classList.add('has-editor-bottom')
        } else { // normal mode
            document.getElementById(EDOX_EDITOR);
            document.body.removeChild();
        }
    }
}

export { 
    Edox
};