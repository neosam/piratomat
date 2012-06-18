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
 * This let the user vote for one single vote.
 * This meight bei used by VoteView to generate a vote form
 * for a collection of votes.
 */
define([
    'jquery',
    'use!underscore',
    'use!backbone',
    'text!./templates/SingleVoteView.html'
], function($, _, Backbone, templateText) {
    'use strict';
    var template = _.template(templateText);
    return Backbone.View.extend({
        className: 'simpleVoteView',
        tagName: 'tr',

        events: {
            'click voteField': 'voteEvent'
        },

        voteEvent: function() {
            console.log(attributes);
        },

        render: function() {
            this.$el.html(template({
                model: this.model
            }));
            return this;
        }
    });
});