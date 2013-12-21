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
jQuery(function($){
    var userPlaylist = {};
    var getItems = function(){
        var scrollTime = 5;
        var playlistView = $('#section-playlist iframe').contents().find('.pf-playlist-view');
        // Get Items
        var playlistItems = playlistView.find('.sp-list-item').each(function(i, item){
            item = $(item);
            if(!userPlaylist[item.data('uri')]) userPlaylist[item.data('uri')] = {
                'title': item.find('.sp-list-cell-track-name').text(),
                'artistURI': item.find('.sp-list-cell-artist a').data('uri'),
                'artist': item.find('.sp-list-cell-artist a').text(),
                'albumURI': item.find('.sp-list-cell-album a').data('uri'),
                'album': item.find('.sp-list-cell-album a').text()
            }
        });
        GLOBAL.info('Got ' + playlistItems.length + ' items. Continue to scrap in ' + scrollTime + ' seconds...');

        // Calculate TOP offset
        var header = playlistView.find('header.pf-header');
        var rowListHeaders = playlistView.find('.sp-list-header');
        var lastItem = playlistItems.last();
        var totalHeight = playlistView.find('.sp-list-wrapper').outerHeight() + header.outerHeight();
        if( playlistView.scrollTop() + $(window).height() < totalHeight ){
            playlistView.scrollTop( header.outerHeight() + rowListHeaders.outerHeight() + ( lastItem.outerHeight() * parseInt(lastItem.find('.sp-list-listnumber').text()) ) );
            setTimeout(getItems, scrollTime * 1000);
        } else {
            GLOBAL.info('Done! Get ' + Object.keys(userPlaylist).length + ' items.', userPlaylist);
            chrome.extension.sendMessage({
                'items' : userPlaylist
            });
        }
    }
    chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
        GLOBAL.debug('foreground onMessage CALLED!');
        userPlaylist = {};
        if (request == 'getItems') getItems();
    });
})