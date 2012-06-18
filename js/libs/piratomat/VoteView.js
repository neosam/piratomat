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
                var singleVoteView = new SingleVoteView({
                    model: model
                }).render().$el.appendTo($table);
            });

            $table.appendTo($el);
            $submit.html('Vote')
            $submit.appendTo($el);
            return this;
        }
    });
});