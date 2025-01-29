<h1>War & Coin</h1>
<h2>About</h2>
War & Coin is a deckbuilding card game that can be played with a normal deck of playing cards. 

This project is made using vanilla HTML, CSS & JS. As the project goes on I may incorporate any libraries that seem neccessary. It very much a WIP at the moment.

<h2>Rules</h2>
Players start with 30 life each (40 in 2 player).
Last player alive or first to collect a set of red face cards wins.

Red cards are money, worth the value
Black cards are damage, dealing the value in damage

<h3>Setup</h3>
To start, separate cards into separate red and black piles of: J, Q, K, starting cards (values 2 - 4), and the rest (Aces & 5 - 10). Arrange in two rows from left to right of ranks face down then faces ascending face up.

Shuffle and deal the starting cards so each player has an equal number of black and red cards. Then have each player shuffle and place those cards face down as their deck.
To begin, and after each turn, players draw from their deck until they have 4 cards. 

<p style="font-family:'Lucida Console', monospace"> <pre>Ex. Layout:
+------+ +------+ +------+ +------+
|Red   | | Red  | | Red  | | Red  |
|Ranks | | Js   | | Qs   | | Ks   |
|  FD  | |      | |      | |      |
+------+ +------+ +------+ +------+

+------+ +------+ +------+ +------+
|Black | |Black | |Black | |Black |
|Ranks | | Js   | | Qs   | | Ks   |
|  FD  | |      | |      | |      |
+------+ +------+ +------+ +------+</p></pre>

<h3>Actions</h3>
On their turn, players may do one of the following actions using the cards in their hand:

<ul>
<li><h4>Deal damage</h4></li>
Play any number of black cards and choose a player to take the sum of their values in damage. 

<li><h4>Buy Cards</h4></li>
Play any number of red cards and spend up to the sum of their values on cards.<br>
Number cards cost 4 each to buy.<br> Face card prices:<br>
RJ/RQ/RK: 15/20/25<br>
BJ/BQ/BK: 10/15/20

<li><h4>Burn cards</h4></li>
Choose up to two cards in hand to burn (of one or both). These cards are taken out of the game and are not shuffled back in with the rest of the discard deck.

<li><h4>Place Shields</h4></li>
Play one or more shields by placing them landscape on the field.<br>
Shield values:<br>
J/Q/K: 5/10/15<br><br>
You cannot have more than one of the same shield value on the field at once.
For example:<br>
✅ J, Q<br>
❌ J, J<br>
See Special Cards for more details.
</ul>


<h3>After Actions</h3>
Played and bought cards go in the players discard pile. A player may also discard all unused cards after taking their action.

<h3>End of Turn</h3>
After taking their turn, players draw back up to 4 cards. If a player needs to draw and there are no cards in their deck, they shuffle their discard pile and turn it face down as their deck. There is no minimum deck size.



<h3>Special Cards</h3>
<h4>Aces</h4>
Aces duplicate the value of the highest card of that colour when played. (Eg A♠️, 7♣️, 6♠️ deals 20 instead of 13. A♦️, 3♥️,  5♦️ is worth 13 instead of 8)

<h4>Faces</h4>
Black face cards are placed landscape in front of a player when bought, and act as shields.<br>
J/Q/K defends 5/10/15 damage. (Subtract that from the damage dealt).<br>
If an attack deals the shield amount or more, the shield card is put in the discard pile and the remaining damage goes through to the player.<br>
Shield damage does not carry over between turns (for example, you cannot break a king shield by doing 5 on one turn, then 10 on the next).<br>
If a player draws a shield, they can spend their turn to place it on the field. You can place multiple shield cards in one turn. <br>
You can't have multiple of the same shield card on the field.<br>
<br>
Red face cards go in the discard pile when bought. If a red face card is in hand at the beginning of a players turn, they place it automatically (they can still take their action for the turn). If a player has the whole red face set (J/Q/K) on the field, they win.
