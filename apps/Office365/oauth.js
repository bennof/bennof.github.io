

var ReCall =(function (){
    var OAuth = (function (){
        var data = {};
        var config = {};
        var url = "";
    
        var init = function (options){
            console.log('inti ...');
            OAuth.config = options.Config || {};
            OAuth.url = options.URL || "";
    
            // Parse hash
            var hash = location.hash.substring(1);
            var params = {}; 
            var regex = /([^&=]+)=([^&]*)/g, elem;
            while (elem = regex.exec(hash)) {
                params[decodeURIComponent(elem[1])] = decodeURIComponent(elem[2]);
            }
            console.log(params)
    
            // check for error
            if(params['error']) {
                if (options.onError){
                    options.onError(params['error']);
                }
                else alert(params['error']);
            }
    
            // check for success
            if(params['state'] && params['access_token'] && params['token_type']){
                console.log('success')
                OAuth.Data = params; 
                if(OAuth.Data["id_token"]) {
                    var base64Url = OAuth.Data["id_token"].split('.')[1];
                    var base64 = base64Url.replace('-', '+').replace('_', '/');
                    OAuth.Data["id_token"] = JSON.parse(window.atob(base64));
                }
    
                if(options && options.onSuccess) {
                    options.onSuccess();
                }
                return
            }
    
            if(options && options.onNone) {
                options.onNone();
            }
            console.log('failed')
        }
    
        var request = (function(){
            var req = {}; 
            req.Send = function(src, options){
                //setup internal data
                var callback_name = 
                    on_success = options.onSuccess || function(){},
                    on_error = options.onError || function(){};
                    
                var http = new XMLHttpRequest();
                http.timeout = options.timeout*1000 || 10*1000; // sec
                http.ontimeout = options.onTimeout || function(e){};
                http.onreadystatechange = function () {
                    if (http.readyState === XMLHttpRequest.DONE) {
                        if (http.status === 200 || http.status === 201 || http.status === 204) {
                            on_success(http.responseText)
                        } else {
                            on_error(http.responseText,http.status);
                        }
                    }
                }
                http.open(options.Method || 'GET' , src, true);
                http.setRequestHeader('Authorization', 'Bearer ' + OAuth.Data['access_token']);
                if (options.Body) {
                    http.setRequestHeader('Content-Type', options.Type || "text/plain");
                    http.send(options.Body)
                } else {
                    http.send(null);
                }
            }
            return req;
        })();
    
        var login = function(){
            console.log('login ...');
            var form = document.createElement('form');
            form.setAttribute('method', 'GET'); 
            form.setAttribute('action', OAuth.url);
            for (var p in OAuth.config) {
                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', p);
                input.setAttribute('value', OAuth.config[p]);
                form.appendChild(input);
            }
            document.body.appendChild(form);
            form.submit();
        }
    
        return {
            Data: data,
            Init: init,
            Login: login,
            Request: request
        }
    })();

    return {
        OAuth : OAuth
    }
})();



