var OAuth = (function (){
    var data = {};
    var config = {};
    var url = "";

    var init = function (options){
        console.log('inti ...');
        config = options.Config || {};
        url = options.URL || "";

        // Parse hash
        var hash = location.hash.substring(1);
        console.log('hash: '+hash)
        var params = {}; var regex = /([^&=]+)=([^&]*)/g, elem;
        while (elem = regex.exec(hash)) {
            params[decodeURIComponent(elem[1])] = decodeURIComponent(elem[2]);
        }
        console.log('params: '+params)

        // check for error
        if(params['error']) {
            if (options.onError){
                options.onError(params['error']);
            }
            else alert(params['error']);
        }

        // check for success
        if(params['state'] && params['access_token'] && params['token_type']){
            data = params; 
            if(options && options.onSuccess) {
                options.onSuccess();
            }
        }
    }

    var request = (function(src,options){
        var req = {}; 
        req.Request = function(src, options){
            //setup internal data
            var callback_name = 
                on_success = options.onSuccess || function(){},
                on_error = options.onError || function(){};
                
            var http = new XMLHttpRequest();
            http.timeout = options.timeout*1000 || 10*1000; // sec
            http.ontimeout = options.onTimeout || function(e){};
            http.setRequestHeader('Authorization', 'Bearer ' + data['access_token']);
            http.onreadystatechange = function () {
                if (http.readyState === XMLHttpRequest.DONE) {
                    if (http.status === 200) {
                        on_success(http.responseText)
                    } else {
                        on_error(http.responseText,http.status);
                    }
                }
            }
            http.open(options.Method || 'GET' , src, true);
            http.send(null);
        }
        return req;
    })();

    var login = function(){
        console.log('login ...');
        var form = document.createElement('form');
        form.setAttribute('method', 'GET'); 
        form.setAttribute('action', url);
        for (var p in config) {
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', p);
            input.setAttribute('value', config[p]);
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


