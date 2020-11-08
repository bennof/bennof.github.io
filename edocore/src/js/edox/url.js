/* url
** Copyright (c) 2018-2020 Benjamin Benno Falkner
*/

/*jshint esversion: 6 */

// scan header
export function header_map(Xhttp){
    var i, Elem, Key, Value, R={}, HL = Xhttp.getAllResponseHeaders().trim().split(/[\r\n]+/);
    for ( i=0; i<HL.length; i++ ) {
        Elem = HL[i].split(': ');
        Key   = Elem.shift();
        Value = Elem.join(': ');
        R[Key] = Value;
    }
    return R;
}
  
export function hash_map(URL){
    var i, R1, Res={}, Hash = (URL.hash.substr(1)).split("&");
    for (i=0; i<Hash.length; i++) {
        R1 = Hash[i].split("=");
        Res[R1[0]]=decodeURIComponent(R1[1]) || R1[0];
    }
    return Res;
}
  
// window.location
export function query_map(URL){
    var i, R1, Res={}, Query = (URL.search.substr(1)).split("&");
    for (i=0; i<Query.length; i++) {
        R1 = Query[i].split("=");
        Res[R1[0]]=R1[1] || R1[0];
    }
    return Res;
}