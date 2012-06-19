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

/*global define*/
define([
    './Vote',
    './VoteCollection',
    './SingleVoteView',
    './VoteView'
], function(
    Vote,
    VoteCollection,
    SingleVoteView,
    VoteView
) {
    return {
        Vote: Vote,
        VoteCollection: VoteCollection,
        SingleVoteView: SingleVoteView,
        VoteView: VoteView
    };
});