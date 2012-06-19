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
 * VoteView displays the result of all votes.
 * It includes a SimpleResultView for each Vote which is stored
 * in the VoteCollection and a submit button to send the votes
 */
/*global define*/
define([
    'jquery',
    'use!underscore',
    'use!backbone',
    './SingleResultView',
    './Vote'
], function($, _, Backbone, SingleResultView, Vote) {
    return Backbone.View.extend({
        className: 'voteView',
        tagName: 'div',

        events: {
            'click button': 'newVote'
        },

        newVote: function() {
            this.doNewVote();
        },

        render: function() {
            var $el = this.$el,
                $table = $('<table>'),
                $firstRow = $('<tr>'),
                $submit = $('<button>');
            $el.html('');
            $firstRow.append($('<td>'));
            $firstRow.append($('<td>Ja</td>'));
            $firstRow.append($('<td>Nein</td>'));
            $firstRow.append($('<td>Wei&szlig; nicht</td>'));
            $table.append($firstRow);
            this.model.each(function(model)  {
                new SingleResultView({
                    model: model
                }).render().$el.appendTo($table);
            });

            $table.appendTo($el);
            $submit.html('Now Vote');
            $submit.appendTo($el);
            return this;
        }
    });
});