/*global define*/
/*global io*/
/*global window*/
define([
        'jquery',
        'use!underscore',
        'piratomat'
], function($, _, Piratomat){
    var injectServerMode = function(vote, socket) {
        var enableEmit = true;
        vote.on('change:yesVotes change:noVotes change:wtfVotes', function() {
            if (enableEmit) {
                socket.emit('vote', vote);
                console.log('emit a vote');
            }
        });
        socket.on('push_' + vote.get('order'), function(newVote) {
            console.log('push received');
            enableEmit = false;
            vote.set('yesVotes', newVote.yesVotes);
            vote.set('noVotes', newVote.noVotes);
            vote.set('wtfVotes', newVote.wtfVotes);
            enableEmit = true;
        });
    },

        generateVotes = function(socket, callback) {
        var all = new Piratomat.VoteCollection();
        $.getJSON('js/questions.js', function(data) {
            _.each(data.questions, function(question, i) {
                var vote = new Piratomat.Vote({
                    voteId: data.id,
                    question: question.question, /* wonderful line */
                    order: i
                });
                if (socket !== null) {
                    injectServerMode(vote, socket);
                }
                all.add(vote);
            });
            callback(all);
        });
    };



    return function() {
        var socket = null;
        if (window.io === undefined) {
            console.log('local mode');
        } else {
            console.log('server mode');
            socket = window.io.connect(window.location.origin);
        }
        generateVotes(socket, function(voteCollection) {
            var $pirateLogo = $('<img src="media/piraten-landshut.svg">'),
                voteView = new Piratomat.VoteView({
                    model: voteCollection
                }),
                resultView = new Piratomat.ResultView({
                    model: voteCollection
                });
            $pirateLogo.addClass('logo');
            $pirateLogo.appendTo('body');
            voteView.showResultView = function() {
                voteView.$el.hide();
                resultView.$el.show();
            };
            resultView.doNewVote = function() {
                resultView.$el.hide();
                voteView.$el.show();
            };
            resultView.render().$el.hide();
            voteView.render().$el.appendTo('body');
            resultView.$el.appendTo('body');
        });
    };
});
