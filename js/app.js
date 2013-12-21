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
var GLOBAL = {
    'keys': {
        'show_debug': 'SPDL.show_debug',
        'show_info': 'SPDL.show_info',
        'playlist_song_format': 'SPDL.playlist_song_format',
        'playlist_items': 'SPDL.playlist_items'
    },
    'options':{
        'show_debug': false,
        'show_info': true,
        'playlist_song_format': '#EXTINF:0, {song.artist} - {song.title}',
        'view_playlist': 'app/view.html',
    },
    'playlist_items': {},
    'debug' : function(msg){
        if ( GLOBAL.options.show_debug ) console.log('[ Spotify Playlist Extractor ] >> ' + msg);
    },
    'info': function(msg){
        if ( GLOBAL.options.show_info ) console.log('[ Spotify Playlist Extractor ] >> ' + msg);
    },
    'getFormattedLine': function(song){
        var ret = GLOBAL.options.playlist_song_format;

        // Do the replacements
        for (var attr in song){
            ret = ret.replace('{song.'+ attr +'}', song[attr]);
        }

        return ret;
    },
    'getPlaylist': function(){
        var ret = '#EXTM3U\n';

        // Concatenate items
        for (var songURI in GLOBAL.playlist_items){
            var song = GLOBAL.playlist_items[songURI];
            ret += GLOBAL.getFormattedLine(song) + '\n';
        }

        return ret;
    },
    'getPlaylistJsonString': function(){
        var ret = [];

        for (var songURI in GLOBAL.playlist_items){
            var song = GLOBAL.playlist_items[songURI];
            ret.push({
                'title': song.title,
                'artist': song.artist,
                'album': song.album
            });
        }

        return JSON.stringify( ret );
    },
    'saveItems': function(items){
        window.localStorage.setItem( GLOBAL.keys.playlist_items, JSON.stringify(items) );
    },
    'init': function(){
        if ( window.localStorage.getItem(GLOBAL.keys.show_debug) ) GLOBAL.options.show_debug = window.localStorage.getItem(GLOBAL.keys.show_debug);
        if ( window.localStorage.getItem(GLOBAL.keys.show_info) ) GLOBAL.options.show_info = window.localStorage.getItem(GLOBAL.keys.show_info);
        if ( window.localStorage.getItem(GLOBAL.keys.playlist_song_format) ) GLOBAL.options.playlist_song_format = window.localStorage.getItem(GLOBAL.keys.playlist_song_format);
        if ( window.localStorage.getItem(GLOBAL.keys.playlist_items) ) GLOBAL.playlist_items = JSON.parse( window.localStorage.getItem(GLOBAL.keys.playlist_items) );
    }
};
GLOBAL.init();