/*global define*/
define([
        'jquery',
        'use!underscore',
        'piratomat'
], function($, _, Piratomat){
    var generateVotes = function(callback) {
        var all = new Piratomat.VoteCollection();
        $.getJSON('js/questions.js', function(data) {
            _.each(data.questions, function(question, i) {
                var vote = new Piratomat.Vote({
                    voteId: data.id,
                    question: question.question, /* wonderful line */
                    order: i
                });
                all.add(vote);
            });
            callback(all);
        });
    };

    return function() {
        generateVotes(function(voteCollection) {
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
