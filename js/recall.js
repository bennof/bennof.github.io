// Copyright 2018 Benjamin 'Benno' Falkner. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.



var ReCall = (function() {
    var body = document.getElementsByTagName("BODY")[0];
    var popups = []; 

    var EntityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    // escape html chracters
    var escapeHtml = function (string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return EntityMap[s];
        });
    }
    
    // code elements by class
    var CleanCode = function (cl_name) {
        codeElem = document.querySelectorAll(cl_name);
        codeElem.forEach(function(elem) {
          var newContent = escapeHtml(elem.innerHTML)
          elem.innerHTML = newContent;
        });
    }

    // create fixed toolbar
    var FixedToolbar = function (name){
        this.Nav = document.querySelectorAll(name)[0];
        this.NavBar = this.Nav.id;
        this.NavBarOffset = this.Nav.offsetTop;
        window.addEventListener('scroll', this.scroll.bind(this))
        window.addEventListener('resize',this.resize.bind(this))
    }
    
    FixedToolbar.prototype.scroll = function(){
        if(this.NavBarOffset < window.scrollY && !body.classList.contains('has-docked-'+this.NavBar)) {
            body.classList.add('has-docked-'+this.NavBar)
        }
        if(this.NavBarOffset > window.scrollY && body.classList.contains('has-docked-'+this.NavBar)) {
            body.classList.remove('has-docked-'+this.NavBar)
        }
    }
    
    FixedToolbar.prototype.resize = function(){
        body.classList.remove('has-docked-'+this.NavBar);
        this.NavBarOffset = this.Nav.offsetTop;
        this.scroll()
    }

    // Create an Autocomplete handler
    var AutoComplete = function (name, options) {
        this.Name = name;
        this.Search = document.querySelector(name);
        this.AC = null;
        this.Data = null;
        this.Link = options.url || '';
        this.url = options.hint || '';
        this.Method = options.Method || JSONP,

        this.Search.onkeyup  = this.update.bind(this);
        document.onclick = this.delete.bind(this);
    } 

    AutoComplete.prototype.update = function(e){
        // request data
        var val = this.Search.value;

        if (val.length > 0) {
            // get data
            this.Method.Request(this.url+val,{onSuccess: this.receive.bind(this), timeout: 5})


            /*if (this.httpRequest == null){ 
                this.httpRequest = new XMLHttpRequest();
                this.httpRequest.onreadystatechange = this.receive.bind(this);
                this.httpRequest.open('GET', this.url,true);
                this.httpRequest.send(null);
            }*/
            if(this.Data != null){
                this.draw(val);
            }
            return ;
        }
        this.delete();
    }

    AutoComplete.prototype.receive = function(msg){
        if(this.Method == JSONP) {
            this.Data = msg;
        } else {
            this.Data = JSON.parse(msg);
        }
        this.draw(this.Search.value);
        
    }

    AutoComplete.prototype.draw = function(val) {
        // loop data
        var inner = "<ul>";
        var count = 0;
        if (this.Data != null){
            for (i = 0; i < this.Data.length; i++) {
                if (this.Data[i].substr(0, val.length).toLowerCase() == val.toLowerCase()) {
                    inner += "<li><a href=\""+this.Link+this.Data[i]+"\"><strong>" + this.Data[i].substr(0, val.length) + "</strong>"+this.Data[i].substr(val.length)+"</li>";
                    count++;
                }
            }
        }
        if(count>0) {
            inner += "</ul>";
            if(this.AC == null ) { // if no frame exists
                var elem = document.createElement("div");
                elem.id = this.Name.substr(1)+"autocomplete";
                elem.classList.add("autocomplete");
                elem.classList.add("indent");
                this.Search.parentElement.appendChild(elem);//("<div id=\""+this.name.substr(1)+"autocomplete\" class=\"autocomplete\"></div>");
                this.AC = elem;//$(this.name+"autocomplete");
            }
            this.AC.innerHTML=inner;
            return 
        }
        this.delete();
    }

    AutoComplete.prototype.delete = function(e){
        if(this.AC!=null){
            this.AC.remove();
            this.AC = null;
        }
    }

    // JSONP Request
    var JSONP = (function (){
        var req = {};
        req.Request = function(src, options) {
            //setup internal data
            var callback_name = options.callbackName || 'callback',
                on_success = options.onSuccess || function(){},
                on_timeout = options.onTimeout || function(){},
                timeout = options.timeout || 10; // sec
            // handle timeout
            var timeout_trigger = window.setTimeout(function(){
                window[callback_name] = function(){};
                on_timeout();
            }, timeout * 1000);

            // handle success
            window[callback_name] = function(data){
                window.clearTimeout(timeout_trigger);
                on_success(data);
            }

            // create the script element
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;

            document.getElementsByTagName('head')[0].appendChild(script);
        }
        return req;
    })();

    // AJAX Request
    var AJAX = (function() { 
        var req = {}; 
        req.Request = function(src, options){
            //setup internal data
            var callback_name = 
                on_success = options.onSuccess || function(){},
                on_error = options.onError || function(){};
                
            var http = new XMLHttpRequest();
            http.timeout = options.timeout*1000 || 10*1000; // sec
            http.ontimeout = options.onTimeout || function(e){};
            http.onreadystatechange = function () {
                if (http.readyState === XMLHttpRequest.DONE) {
                    if (http.status === 200) {
                        on_success(http.responseText)
                    } else {
                        on_error(http.responseText,http.status);
                    }
                }
            }
            http.open('GET', src,true);
            http.send(null);
        }

        return req;
    })();

    // Ready function
    var docReady = (function(){
        var readyList = [];
        var readyFired = false;
        var readyEventHandlers = false;

        var r = function (callback, context) {
            if (typeof callback !== "function") { throw new TypeError("callback for Ready(fn) must be a function"); }
            if (readyFired) { // execute function 
                setTimeout(function() {callback(context);}, 1);
                return;
            } else { // schedule for document ready
                readyList.push({func: callback, ctx: context});
            }

            if (document.readyState === "complete") {
                setTimeout(ready, 1);
            } else if (!readyEventHandlers) { // add handler if missing
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", run, false);
                    window.addEventListener("load", run, false);
                } else {
                    document.attachEvent("onreadystatechange", readyStateChange);
                    window.attachEvent("onload", run);
                }
                readyEventHandlersInstalled = true;
            }
        }

        function run(){
            if (!readyFired) {
                readyFired = true;
                // loop list
                for (var i = 0; i < readyList.length; i++) {
                    readyList[i].func.call(window, readyList[i].ctx); //execute
                }
                readyList = []; // clear
            } 
        }
    
        function readyStateChange() {
            if ( document.readyState === "complete" ) { run();}
        }
        return r;
    })();


    // PopUp HAndler
    var PopUp = (function(){
        var pu = {
            id: "ReCallPopUp_0x0001"
        }
        pu.Open = function(html){
            var pop;
            if(popups.length == 0 ){ // create new popup
                background = document.createElement('div');
                background.id = this.id+"background"
                background.classList.add("popup_background")
                pop = document.createElement('div');
                pop.id = this.id;
                pop.classList.add("popup");
                pop.innerHTML = html;
                body.appendChild(background);
                body.appendChild(pop);
            } else { // push on stack
                pop = document.getElementById(this.id);
                pop.innerHTML = html;
                popups.push(html);
            } 
            popups.push(pop);
        }

        pu.Replace = function(html){
            if(popups.length > 0) {
                pop = document.getElementById(this.id);
                pop.innerHTML = html;
                popups.pop();
                popups.push(html);
            }else {
                pu.Open(html);
            }
        }

        pu.Close = function(){
            if(popups.length == 0 ) {
                return;
            }
            else if(popups.length > 1 ){ // take next in stack
                pop = document.getElementById(this.id);
                pop.innerHTML(popups.pop());
            } else { // remove popup
                pop = document.getElementById(this.id);
                background = document.getElementById(this.id+"background");
                body.removeChild(pop);
                body.removeChild(background);
                popups.pop();
            }
        }

        pu.CloseAll = function() {
            if(popups.length == 0 ) {
                return;
            } else {
                pop = document.getElementById(this.id);
                background = document.getElementById(this.id+"background");
                document.removeChild(pop);
                document.removeChild(background);
                popups = [];
            } 
        }
        return pu;
    })();
 

    // create a Table handler
    var Table = function (name, edit){
        this.table = document.querySelector(name);
        this.hasHeader = true;
        this.cell = null;
        this.data = null;
        this.edit = edit;
        this.table.onclick = this.clicked.bind(this);
    }

    Table.prototype.Clear = function (){
        while (this.table.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }
    } 

    Table.prototype.clicked = function(e){
        var target = e.target;
        if (target.tagName == "TH" || target.tagName == "TD"){
            var cell = {col: target.cellIndex, row: target.parentElement.rowIndex};
            if (this.hasHeader && cell.row == 0) {
                return;
            } 
            // check if edit -- missing
            var content = e.target.innerText;
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }
            var input = document.createElement("input");
            input.type = "text"; // set the CSS class
            input.value = content;
            input.onblur = this.release.bind(this);
            input.onkeypress = (function(e){if(e.charCode==13){input.blur()}});
            target.appendChild(input); // put it into the DOM
            this.cell = cell;
            input.focus();
        }
    }

    Table.prototype.release = function(){
        console.log("realease "+this.cell.row+" "+this.cell.col)
        if (this.cell != null) {
            var cell = this.cell;
            this.cell = null;
            var target = this.table.rows[cell.row].cells[cell.col];
           
            var content = target.firstChild.value;
            if(target.firstChild)
                target.removeChild(target.firstChild);
            target.innerText = content;
        }
    }

    Table.prototype.redraw = function(){}
    Table.prototype.Save = function(){}
    Table.prototype.Load = function(){}

    
    return {
        escapeHtml:  escapeHtml,
        CleanCode:   CleanCode,
        FixedToolbar: function(name){
            body = document.getElementsByTagName("BODY")[0];
            return new FixedToolbar(name)
        },

        AutoComplete : function(name,url,urlupdate){
            return new AutoComplete(name,url,urlupdate)
        },
        
        JSONP : JSONP, 
        AJAX : AJAX,
        Ready: docReady,
        PopUp: PopUp,
        Table: function(name) {
            return new Table(name)
        }
    };  
})(); 