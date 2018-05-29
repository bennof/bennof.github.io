// Copyright 2018 Benjamin 'Benno' Falkner. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

/* will be removed
var ReCall = {
    Body : $('body'),
    Window : $(window),
    EntityMap : {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    },

    // escape html chracters
    escapeHtml : function (string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return ReCall.EntityMap[s];
        });
    },
    
    // code elements by class
    CleanCode : function (cl_name) {
        codeElem = $(cl_name)
        codeElem.each(function() {
          var newContent = ReCall.escapeHtml($(this).html())
          $(this).html(newContent)
        })
    },

    //
    FixedToolbar : function(name){
        ReCall.Body = $('body')
        return new FixedToolbar(name)
    },

    // 
    Autocomplete : function(name,url){
        return new Autocomplete(name,url)
    },
    
    AutocompleteDefaultData: ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],
};

function FixedToolbar (name){
    this.Nav = $(name)
    this.Navbar = this.Nav[0].id
    this.NavOffset = this.Nav.offset().top
    
    ReCall.Window.on('scroll', this.scroll.bind(this))
    ReCall.Window.on('resize',this.resize.bind(this))
}

FixedToolbar.prototype.scroll = function(){
    if(this.NavOffset < ReCall.Window.scrollTop() && !ReCall.Body.hasClass('has-docked-'+this.Navbar)) {
        ReCall.Body.addClass('has-docked-'+this.Navbar)
    }
    if(this.NavOffset > ReCall.Window.scrollTop() && ReCall.Body.hasClass('has-docked-'+this.Navbar)) {
        ReCall.Body.removeClass('has-docked-'+this.Navbar)
    }
}

FixedToolbar.prototype.resize = function(){
    ReCall.Body.removeClass('has-docked-'+this.Navbar)
    this.NavOffset = this.Nav.offset().top
    this.scroll()
}


function Autocomplete (name, url, urlupdate){
    this.name = name;
    this.Search = $(name);
    this.AC = null;
    this.url = url;
    this.urlupdate = urlupdate;
    this.data = ReCall.AutocompleteDefaultData;

    this.Search.keyup(this.update.bind(this));
    $(document).click(this.delete.bind(this));
}

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
        for (i = 0; i < this.data.length; i++) {
            if (this.data[i].substr(0, val.length).toLowerCase() == val.toLowerCase()) {
                inner += "<li><a href=\""+this.url+this.data[i]+"\"><strong>" + this.data[i].substr(0, val.length) + "</strong>"+this.data[i].substr(val.length)+"</li>";
            }
        }
        inner += "</ul>";

        this.AC.html(inner);
    } else {
        this.delete();
    }
}

Autocomplete.prototype.delete = function(e){
    if(this.AC!=null){
        this.AC.remove();
        this.AC = null;
    }
}
*/


var ReCall = (function() {
    var Body = $('body');
    var Window = $(window);
    var EntityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    var AutocompleteDefaultData = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

    // escape html chracters
    var escapeHtml = function (string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return EntityMap[s];
        });
    }
    
    // code elements by class
    var CleanCode = function (cl_name) {
        codeElem = $(cl_name)
        codeElem.each(function() {
          var newContent = escapeHtml($(this).html())
          $(this).html(newContent)
        })
    }

    var FixedToolbar = function (name){
        this.Nav = $(name);
        this.Navbar = this.Nav[0].id
        this.NavOffset = this.Nav.offset().top
        
        Window.on('scroll', this.scroll.bind(this))
        Window.on('resize',this.resize.bind(this))
    }
    
    FixedToolbar.prototype.scroll = function(){
        if(this.NavOffset < Window.scrollTop() && !Body.hasClass('has-docked-'+this.Navbar)) {
            Body.addClass('has-docked-'+this.Navbar)
        }
        if(this.NavOffset > Window.scrollTop() && Body.hasClass('has-docked-'+this.Navbar)) {
            Body.removeClass('has-docked-'+this.Navbar)
        }
    }
    
    FixedToolbar.prototype.resize = function(){
        Body.removeClass('has-docked-'+this.Navbar)
        this.NavOffset = this.Nav.offset().top
        this.scroll()
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
            for (i = 0; i < this.data.length; i++) {
                if (this.data[i].substr(0, val.length).toLowerCase() == val.toLowerCase()) {
                    inner += "<li><a href=\""+this.url+this.data[i]+"\"><strong>" + this.data[i].substr(0, val.length) + "</strong>"+this.data[i].substr(val.length)+"</li>";
                }
            }
            inner += "</ul>";
    
            this.AC.html(inner);
        } else {
            this.delete();
        }
    }
    
    Autocomplete.prototype.delete = function(e){
        if(this.AC!=null){
            this.AC.remove();
            this.AC = null;
        }
    }
 

    var Class = function(i){
        this.id=i;
        this.iid= this.id+3;
    } 

    Class.prototype.get = function(){return this.iid}
    Class.prototype.set = function(i){this.id = i}



    return {
        escapeHtml:  escapeHtml,
        CleanCode:   CleanCode,
        FixedToolbar: function(name){
            Body = $('body')
            return new FixedToolbar(name)
        },
        Autocomplete : function(name,url,urlupdate){
            return new Autocomplete(name,url,urlupdate)
        },
        Class: Class
    };  
})(); 