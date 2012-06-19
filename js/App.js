/*global define*/
define([
        'jquery',
        'underscore',
        'piratomat'
], function($, _, Piratomat){
    var generateVotes = function() {
        var vote1, vote2, vote3, all;
        vote1 = new Piratomat.Vote({
                question: 'Bla bla 1',
                order: 0
        });
        vote2 = new Piratomat.Vote({
                question: "Bla bla blub 2",
                order: 1
        });
        vote3 = new Piratomat.Vote({
                question: "asd;lfjasdfja 3",
                order: 2
        });
        all = new Piratomat.VoteCollection();
        all.add(vote1);
        all.add(vote2);
        all.add(vote3);
        return all;
    };

    return function() {
        var voteCollection = generateVotes(),
            $pirateLogo = $('<img src="media/piraten-landshut.svg">'),
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
    };
});
