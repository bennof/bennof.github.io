// Copyright 2018 Benjamin 'Benno' Falkner. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.



var ReCall = (function() {
    var Body = $('body');
    var body = document.getElementsByTagName("BODY")[0];
    var Window = $(window);
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
    var AutoComplete = function (name, url, link) {
        this.Name = name;
        this.Search = document.querySelector(name);
        this.AC = null;
        this.Data = null;
        this.Link = link;
        this.url = url;
        this.httpRequest = null;

        this.Search.onkeyup  = this.update.bind(this);
        document.onclick = this.delete.bind(this);
    } 

    AutoComplete.prototype.update = function(e){
        // request data
        var val = this.Search.value;
        console.log('update: '+ val)

        if (val.length > 0) {
            // get data
            if (this.httpRequest == null){ 
                this.httpRequest = new XMLHttpRequest();
                this.httpRequest.onreadystatechange = this.receive.bind(this);
                this.httpRequest.open('GET', this.url,true);
                this.httpRequest.send(null);
            }
            if(this.Data != null){
                this.draw(val);
            }
            return ;
        }
        this.delete();
    }

    AutoComplete.prototype.receive = function(){
        if (this.httpRequest.readyState === XMLHttpRequest.DONE) {
            if (this.httpRequest.status === 200) {
                console.log(this.httpRequest.responseText);
                this.Data = JSON.parse(this.httpRequest.responseText);
                this.draw(this.Search.value);
            } else {
                console.log(this.httpRequest.status);
            }
            this.httpRequest = null;
        }
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

        Autocomplete : function(name,url,urlupdate){
            return new Autocomplete(name,url,urlupdate)
        },

        AutoComplete : function(name,url,urlupdate){
            return new AutoComplete(name,url,urlupdate)
        },

        Table: function(name) {
            return new Table(name)
        }
    };  
})(); 