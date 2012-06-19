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
 * This let the user view one single vote.
 */
/*global define*/
define([
    'jquery',
    'use!underscore',
    'use!backbone',
    'text!./templates/SingleResultView.html'
], function($, _, Backbone, templateText) {
    'use strict';
    var template = _.template(templateText);
    return Backbone.View.extend({
        className: 'simpleVoteView',
        tagName: 'tr',

        initialize: function() {
            var that = this;
            this.model.on('change', function(model, state) {
                that.render();
            });
        },

        render: function() {
            var yesVotes = this.model.get('yesVotes'),
                noVotes = this.model.get('noVotes'),
                wtfVotes = this.model.get('wtfVotes'),
                allVotes = yesVotes + noVotes + wtfVotes,
                yes = Math.round(yesVotes * 100 / allVotes),
                no = Math.round(noVotes * 100 / allVotes),
                wtf = Math.round(wtfVotes * 100 / allVotes);
            this.$el.html(template({
                model: this.model,
                yes: yes,
                no: no,
                wtf: wtf
            }));
            return this;
        }
    });
});