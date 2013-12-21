/*
    The MIT License (MIT)

    Copyright (c) 2013 Julian Xhokaxhiu

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
jQuery(function($) {
    var downloadFile = function(filename, content) {
        var a = document.createElement('a');
        var blob = new Blob([ content ], {type : "text/plain;charset=UTF-8"});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click(); //this is probably the key - simulating a click on a download link
        delete a;// we don't need this anymore
    }
    var ret = GLOBAL.getPlaylist();
    $('#playlist').text(ret);
    $('#downloadM3U').click(function(e){
        downloadFile('playlist.m3u', ret);
    });
    $('#downloadJSON').click(function(e){
        downloadFile('playlist.json', GLOBAL.getPlaylistJsonString());
    })
});
