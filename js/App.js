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
            $pirateLogo = $('<img src="media/piraten-landshut.svg">');
            view = new Piratomat.VoteView({
                model: voteCollection
            });
        $pirateLogo.addClass('logo');
        $pirateLogo.appendTo('body');
        view.render().$el.appendTo('body');
    }
});
