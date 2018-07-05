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
    var AutoComplete = function (name, url) {
        this.Name = name;
        this.Search = document.querySelector(name);
        this.AC = null;
        this.Data = null;
        this.url = url;
        this.request = null;

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
                console.log(this.httpRequest);
                this.httpRequest.open('GET', this.url,true);
                console.log(this.httpRequest);
                this.httpRequest.send(null);
            }
            this.draw(val);
            return ;
        }
        this.delete();
    }

    AutoComplete.prototype.receive = function(){
        if (this.httpRequest.readyState === XMLHttpRequest.DONE && this.httpRequest.status === 200) {
            this.data = JSON.parse(this.httpRequest.responseText);
            this.draw(this.Search.value);
        }
        this.httpRequest = null;
    }

    AutoComplete.prototype.draw = function(val) {
        // loop data
        var inner = "<ul>";
        var count = 0;
        for (i = 0; i < this.data.length; i++) {
            if (this.data[i].substr(0, val.length).toLowerCase() == val.toLowerCase()) {
                inner += "<li><a href=\""+this.url+this.data[i]+"\"><strong>" + this.data[i].substr(0, val.length) + "</strong>"+this.data[i].substr(val.length)+"</li>";
                count++;
            }
        }
        if(count>0) {
            inner += "</ul>";
            if(this.AC == null ) { // if no frame exists
                this.Search.parent().append("<div id=\""+this.name.substr(1)+"autocomplete\" class=\"autocomplete\"></div>");
                this.AC = $(this.name+"autocomplete");
            }
            this.AC.html(inner);
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

    var Autocomplete = function (name, url, urlupdate){
        this.name = name;
        this.Search = $(name);
        this.AC = null;
        this.url = url;
        this.urlupdate = urlupdate;
        this.data = AutocompleteDefaultData;
    
        this.Search.keyup(this.update.bind(this));
        $(document).click(this.delete.bind(this));
    }
    
    var AutocompleteDefaultData = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    Autocomplete.prototype.update = function(e){
        // request data
        var val = this.Search.val();
        console.log('update: '+ val)
        //skip
        
        if (val.length > 0) {
            //search 
    
            // check ich autocomplete exsits
            if(this.AC == null ) {
                this.Search.parent().append("<div id=\""+this.name.substr(1)+"autocomplete\" class=\"autocomplete\"></div>");
                this.AC = $(this.name+"autocomplete");
            }
    
            // loop data
            var inner = "<ul>";
            var count = 0;
            for (i = 0; i < this.data.length; i++) {
                if (this.data[i].substr(0, val.length).toLowerCase() == val.toLowerCase()) {
                    inner += "<li><a href=\""+this.url+this.data[i]+"\"><strong>" + this.data[i].substr(0, val.length) + "</strong>"+this.data[i].substr(val.length)+"</li>";
                    count++;
                }
            }
            if(count>0) {
                inner += "</ul>";
                this.AC.html(inner);
                return 
            }
        }
        this.delete();
    }
    
    Autocomplete.prototype.delete = function(e){
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