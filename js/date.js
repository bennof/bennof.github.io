// Copyright 2018 Benjamin 'Benno' Falkner. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

var Calendae = {
    Cals:      [],
    Close:    '<i class="fa fa-times" aria-hidden="true"></i>',
    Calendar: '<i class="fa fa-calendar" aria-hidden="true"></i> Calendar',
    Locale:   'de-DE',
    Event:    'event-',
    Day:      'day-',
    Cal:      'cal-',
    Month:    ['January','February','March','April','May','June','July','August','September','October','November','December'],
    Day:      ['Mo','Tu','We','Th','Fr','Sa','So'],

    New: function (name, src, callback) {
        $.getJSON(src, function(result){
            $.each(result, function(i, obj){
                obj.Start = new Date(obj.Start);
                obj.End = new Date(obj.End);
            });
            var cal = new Calendar(name, result);
            callback(cal);
            Calendae.Cals.push(cal);
        });
    },
    
    NewStatic: function (name, data, callback) {
    }
    
}

// Calendar Data
function Calendar(name, data) {
    this.Name  = name;

    this.CalId = '-'+Calendae.Cal+name;
    this.Event = this.CalId+'-'+Calendae.Event;
    this.Day   = this.CalId+'-'+Calendae.Day;

    this.Date  = new Date();
    this.data  = data;
}
//
Calendar.prototype.PopUp = function(e){
    var E = e.currentTarget.id.split("-")
    console.log('Popup handler:'+E[0]+E[E.length-1]);
    console.log(e.currentTarget.id);

    if( $('#popup-'+this.CalId).length ) { //exists
        // do nothing
    } else {
        $(document.body).append('<div id="overlay-'+this.CalId+'" class="overlay"></div>\
             <div id="popup-'+this.CalId+'" class="popup">\
             <div class="right"><a id="'+this.CalId+'-closePopUp" href="#">'+Calendae.Close+'</a></div>\
             <div id="'+this.CalId+'-popupcontent" class="CalendaePopup"></div>\
             </div>');
        $(document).on('click','#'+this.CalId+'-closePopUp',function(){console.log('#popup-'+this.CalId);$('#overlay-'+this.CalId).remove();$('#popup-'+this.CalId).remove();}.bind(this));
    }

    if(E[4] == 'all'){
        this.Calendar(this.CalId+'-popupcontent',new Date());
    }
    else {
        this.Info(this.CalId+'-popupcontent',E[E.length-1]);
    }
}
// draw next dates list to target count events from date
Calendar.prototype.NextDates = function(target, count, date){
    this.Date = date;
    var t = $('#'+target);
    console.log('NextDates >> '+target);
    t.empty(); // clear
    t.append('<p><button id="'+target+this.Event+'all" >'+Calendae.Calendar+'</button></p>');
    t.off('click','#'+target+this.Event+'all');
    t.on('click','#'+target+this.Event+'all',this.PopUp.bind(this));
    var c = 0;
    for (var i = 0; i < this.data.length; i++) {
        if (date.getTime() < this.data[i].Start.getTime()){ // get time larger than start 
            t.append('<p><div class="date">'+this.data[i].Start.toLocaleDateString(Calendae.Locale)+
                     '</div> <a id="'+target+this.Event+i+'" href="#">'+this.data[i].Title+'</a></p>'); 
            t.off('click','#'+target+this.Event+i);
            t.on('click','#'+target+this.Event+i,this.PopUp.bind(this));
            c++;
        }
        if (c == count) break;
    }  
}

// create info about date id at target
Calendar.prototype.Info = function(target, id){
    var t = $('#'+target);
    console.log('Info >> '+target);
    console.log(this.data[id]);
    t.html('<h1>'+this.data[id].Title+'</h1>\
            <h6>'+this.data[id].Start.toLocaleDateString(Calendae.Locale)+' - '+this.data[id].End.toLocaleDateString(Calendae.Locale)+'</h6>\
            <b>'+this.data[id].Location+'</b>\
            <div>'+this.data[id].Info+'</div>');
}
// create a calendar at target with date as selector
Calendar.prototype.Calendar = function(target, date){
    this.Date = date;
    var t = $('#'+target);
    console.log('Calendar >> '+target);
    t.html('<h1>'+Calendae.Calendar+'</h1>\
            <div id="'+target+this.CalId+'" class="calendar"></div>\
            <div id="'+target+this.CalId+'-info"></div>');
    this.Render(target,date);
    $(document).off('click','#'+target+this.CalId+'-prev');
    $(document).on('click','#'+target+this.CalId+'-prev',this.CalendarPrev.bind(this));
    $(document).off('click','#'+target+this.CalId+'-next');
    $(document).on('click','#'+target+this.CalId+'-next',this.CalendarNext.bind(this));
}
// prev month
Calendar.prototype.CalendarPrev = function(e){
    var E = e.currentTarget.id.split("-");
    var target = E[0];
    for(var i=1; i<E.length-1;i++)
        target = target + '-' + E[i];
    console.log('Calendar Prev >> '+target);
    this.Date = new Date(this.Date.getFullYear(), this.Date.getMonth()-1, 1);
    this.Render(target,this.Date);
}
// next month
Calendar.prototype.CalendarNext = function(e){
    var E = e.currentTarget.id.split("-");
    var target = E[0];
    for(var i=1; i<E.length-1;i++)
        target = target + '-' + E[i];
    console.log('Calendar Next >> '+target);
    console.log(e.currentTarget.id);
    this.Date = new Date(this.Date.getFullYear(), this.Date.getMonth()+1, 1);
    this.Render(target,this.Date);
}

// render the calendar
Calendar.prototype.Render = function(target,date){
    var today = new Date();
    var isCurrentMonth = (today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth());
    var sdate = new Date(date.getTime());
    // get first day
    sdate.setDate(1);
    var fdom = (sdate.getDay()+6)%7;
    // calculate days of month
    sdate.setMonth(sdate.getMonth()+1);
    sdate.setDate(0);
    var ldom = sdate.getDate();

    // head block
    var s = '<ul class="head">\
             <li id="'+target+this.CalId+'-prev" class="prev">&#10094;</li>\
             <li id="'+target+this.CalId+'-next" class="next">&#10095;</li>\
             <li>'+Calendae.Month[date.getMonth()]+'<br>\
             <span style="font-size:14px">'+date.getFullYear()+'</span></li>\
             </ul>';
    // weeks
    s += '<ul class="weekdays">';
    for(var i=0; i<Calendae.Day.length; i++) {s += '<li>'+Calendae.Day[i]+'</li>';}
    s += '</ul>';
    // days
    s += '<ul class="days">';
    // loop empty
    for(var i=1; i<= fdom; i++) {s += '<li></li>';}
    // process dates
    var data = this.data;
    var di = 0; 
    //reset time to beginning of the day
    date.setHours(00,00,00,0);
    for(di = 0; di < data.length;di++){if(date.getTime() <= data[di].Start.getTime()) {break;}}
    //console.log("first: "+di);
    // loop days
    for(var i=1; i<= ldom; i++) {
        date.setDate(i);
        var txt = "";
        if ((di < data.length) && date.getFullYear() == data[di].Start.getFullYear() && date.getMonth() == data[di].Start.getMonth() && date.getDate() == data[di].Start.getDate()) {
            txt = '<a id="'+target+this.Event+di+'" href="#">'+i+'</a>';
            $(document).off('click','#'+target+this.Event+di);
            $(document).on('click','#'+target+this.Event+di,this.PopUp.bind(this));
            di++;
        } else {txt = i}
        
        if (isCurrentMonth && i==today.getDate()) { s += '<li class="active">'+txt+'</li>'; // today
        } else { s += '<li>'+txt+'</li>'; } // empty day
    }
    s += '</ul>';

    // build calendar
    console.log('#'+target+this.CalId)
    $('#'+target+this.CalId).html(s);
}

