/* written by Benjamin Benno Falkner */

var VideoPlayer = (function(){
    var SearchURL = "";
    var Target = null;
    var Video = null;
    var Data = null;
    var SeekBar = null;
    return {
        Load: function(id) {
            document.getElementById("selector").style.width= "20px";
            var movie = VideoPlayer.Data.movies[id];
            VideoPlayer.Target.innerHTML = '<video id="_Video" autoplay><source src="'+movie.url+'" type="video/mp4"></video>';
            VideoPlayer.Video = document.getElementById("_Video"); 
            document.getElementById("controls").style.display = "block";
            VideoPlayer.SeekBar = document.getElementById("seek-bar");
            VideoPlayer.Video.addEventListener("timeupdate", function() {
                var value = (100 / VideoPlayer.Video.duration) * VideoPlayer.Video.currentTime;
                VideoPlayer.SeekBar.value = value;
            });
            VideoPlayer.SeekBar.addEventListener("mousedown", function() {
                VideoPlayer.Video.pause();
            });
            VideoPlayer.SeekBar.addEventListener("mouseup", function() {
                VideoPlayer.Video.play();
            });
        },

        Unload: function(){
            VideoPlayer.Target.innerHTML = "";
            VideoPlayer.Video = null;
            document.getElementById("controls").style.display = "none";
            VideoPlayer.Request();
        },

        Play: function(){
            VideoPlayer.Video.play();
        },
        Stop: function(){
            VideoPlayer.Video.pause();
        },
        FF:   function(){
            VideoPlayer.Video.currentTime += 5;
        },
        RW:   function(){
            VideoPlayer.Video.currentTime += 5;
        },

        Slider: function(){
            var time = VideoPlayer.Video.duration * (VideoPlayer.SeekBar.value / 100);
            VideoPlayer.Video.currentTime = time;
        },

        Selection: function(e){
            var sel;
            if(e.target.id != null && e.target.id != "") {
                sel = e.target.id.split('_');
            } else {
                sel = e.target.parentElement.id.split('_');
            }

            //console.log(sel);
            if (sel[1] == "vid") {
                console.log("SELECT: "+sel[2]);
                VideoPlayer.Preview(sel[2]);
            }

            if (sel[1]=="back") {
                VideoPlayer.Request();
            }

            if (sel[1]=="play") {
                VideoPlayer.Load(sel[2]);
            }
        },

        Request: function(){
            var val = document.getElementById("search_video").value;
            console.log("REQUEST: "+VideoPlayer.SearchURL+"?q="+val);
            VideoPlayer.JSONP.Request(VideoPlayer.SearchURL+"?q="+val,{onSuccess: VideoPlayer.Update, timeout: 5})
        },

        Preview: function(id) {
            var movie = VideoPlayer.Data.movies[id];
            var inner = "<h1>"+movie.title+"</h1><i>"+movie.genre+" - "+movie.duration+"</i>";
            inner += "<img style='float: right; max-width: 33%;' src='"+movie.img+"'>"
            if (movie.short != null)
                inner += "<div>"+movie.short+"</div>"
            inner += "<button id='p_play_"+id+"'>Play</button><button id='p_back'>Back</button> "
            document.getElementById("preview_video").innerHTML = inner;
        },

        Update: function(data){
            if (data != null) {
                VideoPlayer.Data = data;

                // special only update if new data recieved
                var sinner = "";
                for (var i in VideoPlayer.Data.selection.sel) {
                    sinner += "<li id='s_vid_"+i+"'>"+VideoPlayer.Data.movies[i].title+"</li>";
                }
                document.getElementById("s_video").innerHTML = sinner;
                document.getElementById("s_video_header").innerText = VideoPlayer.Data.selection.name;
            }

            // filter
            var filter = document.getElementById("search_video").value;

            // hint

            // prev
            var movies = VideoPlayer.Data.movies;
            var previnner = "<h1>Preview</h1>";
            var inner = "";
            var count = 0;
            for (var i = 0; i < movies.length; i++) {
                if (movies[i].title.substr(0, filter.length).toLowerCase() == filter.toLowerCase()) {
                    previnner += '<div id="p_vid_'+i+'" class="movbox"><img src="'+movies[i].img+'"><p>'+movies[i].title+'</p></div>'
                    if (count <5 ) 
                        inner += '<li id="h_vid_'+i+'"><strong>' + movies[i].title.substr(0, filter.length) + '</strong>'+movies[i].title.substr(filter.length)+'</li>';
                    count++;
                }
            }
            document.getElementById("preview_video").innerHTML = previnner;
            document.getElementById("hint_video").innerHTML = inner;
        },


        // JSONP Request
        JSONP: (function (){
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
        })(),

        // Ready function
        Ready: (function(){
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
        })()
    }
})();