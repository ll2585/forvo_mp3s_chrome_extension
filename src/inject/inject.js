/**
I used this tutorial:
http://alexw.me/2013/04/how-to-build-a-simple-chrome-extensio/
to build the basics, base64_decode is from the forvo website, and decode_utf8 and encode_utf8 from stackoverflow (though they are used)
**/
var _AUDIO_HTTP_HOST = "audio.forvo.com:80"

var play_links = document.querySelectorAll('a[class="play"]');
if(play_links.length){
	for (var i = 0; i < play_links.length; i++) {
		var link = play_links[i];
		plugin_name = link.href.split('/').pop().split('.')[0];
		var key = link.getAttribute('onclick').split(',')[1].split("'")[1];
		var decoded_key = base64_decode(key);
		var mp3_path = 'http://' + _AUDIO_HTTP_HOST + '/mp3/' + decoded_key
		var p = document.createElement('p');
		p.innerHTML = '<a href="' + mp3_path +'" download>[mp3]</a>';
		link.insertAdjacentElement('beforebegin',p);
	}
}


function base64_decode(a) {
    var b, d, c, e, f, k = ac = 0;
    e = "";
    var l = [];
    if (!a)
        return a;
    a += "";
    do
        b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), c = b << 18 | d << 12 | e << 6 | f, b = c >> 16 & 255, d = c >> 8 & 255, 
        c &= 255, 64 == e ? l[ac++] = String.fromCharCode(b) : 64 == f ? l[ac++] = String.fromCharCode(b, d) : l[ac++] = String.fromCharCode(b, d, c);
    while (k < a.length);
    e = l.join("");
    return e = utf8_decode(e)
}
function utf8_decode(a) {
    var b = [], d = 0, c = 0, e = 0, f = 0, k = 0;
    for (a += ""; d < a.length; )
        e = a.charCodeAt(d), 128 > e ? (b[c++] = String.fromCharCode(e), d++) : 191 < e && 224 > e ? (f = a.charCodeAt(d + 1), b[c++] = String.fromCharCode((e & 31) << 6 | f & 63), d += 2) : (f = a.charCodeAt(d + 1), k = a.charCodeAt(d + 2), b[c++] = String.fromCharCode((e & 15) << 12 | (f & 63) << 6 | k & 63), d += 3);
    return b.join("")
}
function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}