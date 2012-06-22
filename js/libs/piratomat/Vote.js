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
 * Model object which stores the data for Vote.
 *
 * This stores all the vote-question, the yes, no and don't know votes.
 * It also stores the current user selecion for a new vote.  Because
 * of this, you can only use this object on client side, not on 
 * server side.
 */

/*global define*/
/*global window*/
define(['use!backbone'], function(Backbone) {
    'use strict';
    return Backbone.Model.extend({
        defaults: {
            /**
             * The vote content to display.
             */
            question: '',

            /**
             * How many people voted for yes
             */ 
            yesVotes: 0,

            /**
             * How many people voted for no
             */
            noVotes: 0,

            /**
             * How many people voted for don't know
             */
            wtfVotes: 0,

            /**
             * This is used to order the votes
             */
            order: 0,

            /** 
             * State currently selected by the user.
             * Possible is 'yes', 'no' and 'wtf'.
             */
            state: ''
        },

        initialize: function() {
            /**
             * Set attribute fron local storage if it exists and !== zero.
             */
            var self = this,
                setAttribute = function(attributeName, storageAttribute) {
                var storage = window.localStorage,
                    storageKey = self.get('voteId') + '_' + self.get('order') + '_' + storageAttribute,
                    storageValue = parseInt(storage.getItem(storageKey), 10),
                    attributeValue = self.get(attributeName);
                debugger;
                if (attributeValue !== 0) {
                    return;
                } else if (!isNaN(storageValue)) {
                    self.set(attributeName, storageValue);
                }
            };
            setAttribute('yesVotes', 'yes');
            setAttribute('noVotes', 'no');
            setAttribute('wtfVotes', 'wtf');
            this.on('change:yesVotes', this.saveLocal);
            this.on('change:noVotes', this.saveLocal);
            this.on('change:wtfVotes', this.saveLocal);
        },

        /**
         * Applies the current state to the model.
         * 
         * This function will increment yesVotes, noVotes or
         * wtfVotes depending on the state attribute.  If the
         * state attribute is 'yes', 'no', or 'wtf', it will
         * be successfully increment and return the state.  If
         * state has a different value, yesVotes, noVotes and
         * wtfVotes won't be changed and null is returned.
         *
         * @method addVote
         * @return 'yes', 'no', 'wtf' on succcess or null on fail.
         */
        addVote: function() {
            var returnValue = this.get('state');
            switch (returnValue) {
            case 'yes':
                this.set('yesVotes', this.get('yesVotes') + 1);
                break;
            case 'no':
                this.set('noVotes', this.get('noVotes') + 1);
                break;
            case 'wtf':
                this.set('wtfVotes', this.get('wtfVotes') + 1);
                break;
            default:
                returnValue = null;
                break;
            }
            this.set('state', '');
            return returnValue;
        },

        /**
         * Saves the vote locally using the key-value webstorage
         */
        saveLocal: function() {
            var storage = window.localStorage;
            storage.setItem(this.get('voteId') + "_" + this.get('order') + "_yes", this.get('yesVotes'));
            storage.setItem(this.get('voteId') + "_" + this.get('order') + "_no", this.get('noVotes'));
            storage.setItem(this.get('voteId') + "_" + this.get('order') + "_wtf", this.get('wtfVotes'));
        }
    });
});