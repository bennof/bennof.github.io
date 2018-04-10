// Copyright 2018 Benjamin 'Benno' Falkner. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

var ReCall = {
    Body: $('body'),
    Window: $(window),
    EntityMap: {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    },

    // escape html chracters
    escapeHtml: function (string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return ReCall.EntityMap[s];
        });
    },
    
    // code elements by class
    CleanCode: function (cl_name) {
        codeElem = $(cl_name)
        codeElem.each(function() {
          var newContent = ReCall.escapeHtml($(this).html())
          $(this).html(newContent)
        })
    },

    //
    FixedToolbar: function(name){
        ReCall.Body = $('body')
        return new FixedToolbar(name)
    }
}

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