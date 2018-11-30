

$(document).ready(function(){
	var ObiWan;
	var LukeSkywalker;
	var DarthSidious;
	var DarthMaul;

	var characterSelection = [];
	var character = null;
	var defenders = [];
	var defender = null;

	function startGame(){
		var ObiWan={
			id:0,
			name:"Obi Wan",
			healthPoints: 120,
			baseAttack:10,
			attackPower: 10,
			counterAttackPower: 8,
			img:"assets/images/Obi-Wan.jpg"
		}
		var LukeSkywalker={
			id:1,
			name:"Luke Skywalker",
			healthPoints: 100,
			baseAttack:8,
			attackPower: 8,
			counterAttackPower: 5,
			img:"assets/images/LukeSkywalker.jpg"
		}
		var DarthSidious={
			id:2,
			name:"Darth Sidious",
			healthPoints: 150,
			baseAttack:9,
			attackPower: 9,
			counterAttackPower: 10,
			img:"assets/images/DarthSidious.png"
		}
		var DarthMaul={
			id:3,
			name:"Darth Maul",
			healthPoints: 100,
			baseAttack:12,
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
		$("#character, #defenderArea,#defender,#status").empty();

		$.each(characterSelection,function(index,character)
		{
			
			var newCharacter=$("<div>");
			newCharacter.addClass("characters");
			newCharacter.attr("id",character.id);
			$("<div>").addClass("characters-heading").html(character.name).appendTo(newCharacter);
			$("<div>").addClass("characters-body").html("<img src='"+character.img+"'>").appendTo(newCharacter);
			$("<div>").addClass("characters-footer").html(character.healthPoints).appendTo(newCharacter);

			// append new div to character selection
			//$("#characterSelection").append(newCharacter);
			newCharacter.appendTo("#characterSelection");
			

		});//End each

		console.log("Character"+character);

		//click event of characters class
		$(".characters").on("click",function(){

			// when character has been selected
			if(character===null)
			{
	
			var charid=parseInt($(this).attr("id"));
			character=characterSelection[charid];
			console.log("Character inside the loop"+character);
			console.log("defender"+defender);


			//Loop through character array
			for(i=0;i<characterSelection.length;i++)
			{
				if(i!==charid)
				{
					//add unselected characters to enemies array
				defenders.push(characterSelection[i]);
				//console.log("defender"+defenders);
				$("#"+i).removeClass("characters").addClass("defenders").appendTo(defenderArea);
				}
				else{
					//$("#"+i).appendTo("#character");
					$("#character").append($("#"+i));
				}
			}
				
		
		//click event of defenders class
		$(".defenders").on("click",function(){
			
			
			console.log("defenderrrrrrr"+defender);

			if(defender===null)
			{
			var defenderid=parseInt($(this).attr("id"));
			console.log("defender id "+defenderid);
			defender=characterSelection[defenderid];
			$("#"+defenderid).css({"background-color":"green"});
			$("#"+defenderid).appendTo("#defender");
			
		}
		});// End defenders onclick
	
	
	$("#restart").hide();

}
}); // End characters on click	



	}//end startGame() function
	
	startGame();

	$("#attack").on("click",function()
	{
		// when character has been selected, character has not been defeated and there are still defenders left
		if((character!==null)&&(character.healthPoints>0)&&(defenders.length>0))
		{
		// created variable to store game status messages
		var status="";

		// when defender has been selected
		if(defender!=null)
		{
		// decrease defender HP by character attack power
		defender.healthPoints=defender.healthPoints-character.attackPower;
		status+="You attacked  " + defender.name + "  for  " + character.attackPower + "  Damage <br>";

		// update defender footer
		$("#"+ defender.id+" .characters-footer").html(defender.healthPoints);

		// decrease character HP by defender counter attack power
		character.healthPoints=character.healthPoints-defender.counterAttackPower;
		status+=defender.name+"  attacked you back for  "+defender.attackPower+"  damage <br>";

		// update character footer
		$("#"+character.id+" .characters-footer").html(character.healthPoints);

		// increase character attack power by base attack power
		character.attackPower=character.attackPower+character.baseAttack;

		// when character is defeated
		if(character.healthPoints<=0)
		{
			status="You have been defeated ......Game Over!!!";
			$("#restart").show();
		}

		// when defender is defeated
		if(defender.healthPoints<=0)
		{
			status="You defeated  " + defender.name +"  You can choose to play with another enemy";

		// clear defender selection
		$("#defender").empty();
		defender=null;

		// remove defeated defender from defender array
		defenders.splice(defenders.indexOf(defender),1);
	}
		// when no defenders left
		if(defenders.length===0)
		{
			status="........You Won!!!!.......";
			$("#restart").show();
		}
	}//if 2
	else{
		staus="No enemies left";
	}
	}//if 1

	$("#status").html(status);
	}); //End Attack Onclick
	
	$("#restart").on("click",function()
	{
		startGame();
		$("#restart").hide();
	})
});//End Document
