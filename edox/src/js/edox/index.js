/* edox
** Copyright (c) 2018-2020 Benjamin Benno Falkner
*/

/*jshint esversion: 6 */
import expand from 'emmet';

import * as url from "./url";
import * as file from "./file";

const EDOX_ROUTER = "edox-router"; //hash-router
const EDOX_INCLUDE = "edox-include"; //"html-src"
const EDOX_EDITOR = "edox-editor-r001"; 

/**
 * Requests an resource
 * @param {*} uri  URI to load
 * @param {*} cb   callback function on success
 */
function request(uri, cb){
    console.log("Loading: "+uri);
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
    var elem = target.querySelectorAll('SCRIPT');
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
        this.content = this.doc;

        this.edit_mode = null;
        this.show_editor = false; 
        this.editor = new Editor(thi, this.content);

        this.include_tag = include_tag;
        this.includes = [];
        this.include_all(include_tag);

        this.router_tag = router_tag;
        this.router = this.doc.querySelector('['+router_tag+']');
        if(this.router) {
            this.route();
            window.onhashchange = this.route.bind(this);
        }
    }

    include_all(tag){
        var i, elem, uri, elems = this.doc.querySelectorAll('['+tag+']');
        for ( i=0; i<elems.length; i++ ){
            elem = elems[i];
            uri = elem.getAttribute(tag);
            this.includes.push({target: elem, uri: uri});
            this.include(elem,uri)
        }
    }
    
    include(target, uri){
        request(uri, (res) => {
            this.render(target,res);
        });
    }

    render(target, content) {
        target.innerHTML = content;
        exec_js(target);
    }

    route(resource) {
        var uri;
        if (resource) {
            uri = resource;
        } else {
            var map = url.hash_map(window.location);
            uri = (map[this.tag])? map[this.tag] : this.router.getAttribute(this.tag);
        }

        if(uri){
            console.log("URL:" + uri);
            this.include(this.router,uri);
        } 
    }


    editor_on() {
        this.show_editor = !this.show_editor;
        if(this.show_editor){ // editmode
            var div = document.createElement('DIV');
            div.id = EDOX_EDITOR;
            div.classList.add("bottom-strip");

            div.appendChild(new_button("+",()=>{}));
            div.appendChild(new_button("ok",()=>{}));
            
            div.appendChild(new_button("open",()=>{}));
            div.appendChild(new_button("save",()=>{}));

            document.body.appendChild(div);
            document.body.classList.add('has-bottom-strip');
        } else { // normal mode
            var div = document.getElementById(EDOX_EDITOR);
            if(div){
                document.body.removeChild(div);
                document.body.classList.remove('has-bottom-strip');
            }
        }
    }   
}

class Editor {
    constuctor(doc, target) {
        this.edit_mode = null;
        this.doc = doc;
        this.content = target;
    }

    edit(){}

    open(from){
        file.read((status,data)=>{
            if (status != 200){//error
                alert("ERROR: read file "+from+"\n"+data);
            } else {
                this.target.innerHTML = res;
                exec_js(this.doc);
            }
        },from,"");
    }

    save(as){
        file.save(as,"text/html",this.target.innerHTML)
    }

    enable(target) {
        this.disable(); //disable all active
        var txt = document.createElement('TEXTAREA');
        txt.onkeydown = editor_on_tab_expand;
        txt.classList = target.classList;
        txt.value = target.innerHTML;
        this.edit_mode = {target: target, edit: txt };
        target.parentNode.replaceChild(txt,target);
        txt.focus();
    }

    disable(){
        if(this.edit_mode){
            this.edit_mode.target.innerHTML = this.edit_mode.edit.value;
            this.edit_mode.edit.parentNode.replaceChild(this.edit_mode.target,this.edit_mode.edit);
            this.doc.render(this.edit_mode.target);
            this.edit_mode = null;
        }
    }

    add_block(){
        this.disable();
        var r = prompt("Add block:","div.content");
        if(!r) return;
        r = expand(r);
        console.log("Add Block: "+r);
        this.content.innerHTML = this.content.innerHTML+r;
        for(var i = 0; i < this.target.children.length; i++){
            this.content.children[i].onclick = this.edit;
        }
        var cur = this.content.children[this.content.children.length-1];
        cur.onclick = this.edit;
        this.enable(cur);
    }
}

export { 
    Edox
};