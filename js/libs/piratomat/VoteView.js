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

/**
 * VoteView displays a complete form.
 * It includes a SimpleVoteview for each Vote which is stored
 * in the VoteCollection and a submit button to send the votes
 */
/*global define*/
define([
    'jquery',
    'use!underscore',
    'use!backbone',
    './SingleVoteView',
    './Vote'
], function($, _, Backbone, SingleVoteView, Vote) {
    return Backbone.View.extend({
        className: 'voteView',
        tagName: 'div',

        events: {
            'click button': 'doVote'
        },

        doVote: function() {
            var verified = true;
            /* Verify if all fields are checked */
            this.model.each(function(vote) {
                if (vote.get('state') === '')
                    verified = false;
            });
            if (!verified) {
                return;
            }

            /* Then apply */
            this.model.each(function(vote) {
                vote.addVote();
            });
            this.showResultView();
        },

        render: function() {
            var $el = this.$el,
                $table = $('<table>'),
                $firstRow = $('<tr>'),
                $submit = $('<button>');
            $el.html('');
            $firstRow.append($('<th>'));
            $firstRow.append($('<th>Ja</th>'));
            $firstRow.append($('<th>Nein</th>'));
            $firstRow.append($('<th>Wei&szlig; nicht</th>'));
            $table.append($firstRow);
            this.model.each(function(model)  {
                new SingleVoteView({
                    model: model
                }).render().$el.appendTo($table);
            });

            $table.appendTo($el);
            $submit.html('Vote');
            $submit.appendTo($el);
            return this;
        }
    });
});