$(document).ready(function () {

	var ObiWan;
	var LukeSkywalker;
	var DarthSidious;
	var DarthMaul;

	var characterSelection = [];
	var character = null;
	var defenders = [];
	var defender = null;

	function startGame() {
		ObiWan = {
			id: 0,
			name: "Obi-Wan",
			healthPoints: 120,
			baseAttack:10,
			attackPower: 10,
			counterAttackPower: 8,
			img:"assets/images/Obi-Wan.jpg"
		}

		LukeSkywalker = {
			id: 1,
			name: "Luke Skywalker",
			healthPoints: 100,
			baseAttack: 8,
			attackPower: 8,
			counterAttackPower: 5,
			img:"assets/images/LukeSkywalker.jpg"
		}

		DarthSidious = {
			id: 2,
			name: "Darth Sidious",
			healthPoints: 150,
			baseAttack:9,
			attackPower: 9,
			counterAttackPower: 10,
			img:"assets/images/DarthSidious.png"
		}

		DarthMaul = {
			id: 3,
			name: "Darth Maul",
			healthPoints: 100,
			baseAttack: 12,
			attackPower: 12,
			counterAttackPower: 12,
			img:"assets/images/DarthMaul.jpg"
		}
		// reset character selected
		character = null;

		// reset enemies array
		defenders = [];

		// reset enemy selected
		defender = null;

		// reset character selections
		characterSelection = [ObiWan,LukeSkywalker,DarthSidious,DarthMaul];

		// clears all character divs
		$("#character").empty();
		$("#defenderArea").empty();
		$("#defender").empty();
		$("#status").empty();

		$.each(characterSelection, function(index, character) {
			// create a div for each character to display character selection at start of the game
			var newCharacterDiv = $("<div>").addClass("col-lg-2 characters").attr("id",character.id);

			$("<div>").addClass("characters-heading").html(character.name).appendTo(newCharacterDiv);
			$("<div>").addClass("characters-body").append("<img src='" + character.img + "'>").appendTo(newCharacterDiv);
			$("<div>").addClass("characters-footer").append("<span class='hp'>" + character.healthPoints + "</span>").appendTo(newCharacterDiv);

			// append new div to character selection
			$("#characterSelection").append(newCharacterDiv);
        });
        $(".characters").on("click", function() {
			// when character has been selected
			if(character === null) {
				console.log("picked character");
				//get id of character selected
				var charId = parseInt($(this).attr("id"));

				character = characterSelection[charId];

				// loop through character array
				$.each(characterSelection, function(index, character) {
					// add unselected characters to enemies array
					if(character.id !== charId) {
						defenders.push(character);
						$("#"+character.id).removeClass("characters").addClass("defender").appendTo("#defenderArea");
					} else {
						$("#"+character.id).appendTo("#character");
					}
				});

				// add click event after defender class has been added
				$(".defender").on("click", function() {
					if(defender === null) {
						var defenderId = parseInt($(this).attr("id"));
						console.log(this);
						defender = characterSelection[defenderId];
						$("#"+defenderId).appendTo("#defender");
					}
				});
			}
		});

		$("#restart").hide();
	}

	startGame();

	

	$("#attack").on("click", function() {
		// when character has been selected, character has not been defeated and there are still defenders left
		if(character !== null && character.healthPoints > 0 && defenders.length > 0) {
			// created variable to store game status messages
			var status = "";

			// when defender has been selected
			if(defender !== null) {
				// decrease defender HP by character attack power
				defender.healthPoints -= character.attackPower;
				status += "You attacked " + defender.name + " for " + character.attackPower + " damage.<br>";

				console.log("Defender: ",defender.name,defender.healthPoints);

				// update defender HP
				$("#"+defender.id + " .hp").html(defender.healthPoints);

				// decrease character HP by defender counter attack power
				character.healthPoints -= defender.counterAttackPower;
				status += defender.name + " attacked you back for " + defender.counterAttackPower + " damage.<br>";

				console.log("Character: ",character.name,character.healthPoints);

				// update character HP
				$("#"+character.id + " .hp").html(character.healthPoints);

				// increase character attack power by base attack power
				character.attackPower += character.baseAttack;

				// when character is defeated
				if(character.healthPoints <= 0) {
					status = "You've been defeated... GAME OVER!!!!";
					$("#restart").show();
				} else if(defender.healthPoints <= 0) {	// when defender is defeated
					status = "You have defeated " + defender.name + ", you can choose to fight another enemy.";

					// clear defender selection
					$("#defender").empty();
					defender = null;

					// remove defeated defender from defender array
					defenders.splice(defenders.indexOf(defender),1);
				}

				// when no defenders left
				if(defenders.length === 0) {
					status = "You win!";
					$("#restart").show();
				}
			} else {
				status = "No enemy here.";
			}

			$("#status").html(status);
		}
	})

	$("#restart").on("click", function() {
		startGame();
	})
	
});