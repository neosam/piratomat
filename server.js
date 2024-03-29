/*  This file is part of Piratomat.

    Piratomat is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Piratomat is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Piratomat.  If not, see <http://www.gnu.org/licenses/>.
*/

/*global require*/
/*global __dirname*/
/*global console*/
(function() {
    var staticServe = require('node-static'),
        fileServer = new staticServe.Server(__dirname),
        handler = function(request, response) {
            request.addListener('end', function () {
                fileServer.serve(request, response);
            });
        },
        http = require('http'),
        app = http.createServer(handler),
        io = require('socket.io').listen(app),
        _ = require('underscore'),
        votes = []; /* Votes goes here */
        
 
    app.listen(8080);

    io.sockets.on('connection', function(socket) {
        console.log('a socket connected');
        socket.on('sync', function() {
            _.each(votes, function(vote) {
                socket.emit('push_' + vote.order, vote);
            });
        });        
        socket.on('vote', function(vote) {
            console.log('voted');
            votes[vote.order] = vote;
            socket.broadcast.emit('push_' + vote.order, vote);
        });
    });
})();