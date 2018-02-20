var cans = 0;
var cartSize = 20;
var money = 0.00;
var hunger = 50;
var drunk = 50;

var messages = ["You found a can",
"You found a can, but your stomach rumbled",
"You are too hungry to push the cart!",
"You pushed the cart but found nothing",
"The Ramen is hot and delicious",
"Your cart is full!",
"That hit the spot, and you got a can",

"No one noticed you",
"You found a shiny penny",
"Nickel! Jackpot!",
"A dime!"]

function pushCart(){
	if(Math.random() > getSuccessRate() && cans < cartSize && hunger > 0){
		updateCans(1);
		var s = messages[0];

		if(Math.random() > 0.8 && hunger > 0){
			updateHunger(-5);
			s = messages[1];
		}
		if(Math.random() > 0.95 && drunk > 0){
			updateDrunk(-3);			
		}
		postMessage(s);

	} else{
		if(hunger == 0){
			postMessage(messages[2]);
		}else if(cans >= cartSize){
			postMessage(messages[5]);
		}else{
			postMessage(messages[3]);
		}
		
	}
    updateDisplays(); 
};

function beg(){
	var begResult = Math.random();

	if(begResult > 0.95){
		updateMoney(0.05);		
		postMessage(messages[9]);
	} else
	if(begResult > 0.9){
		updateMoney(0.01);
		postMessage(messages[8]);
	}else{
		postMessage(messages[7]);
	}
	updateDisplays();
};

function getSuccessRate(){	
	if(betweenInclusive(40,80,drunk)){
		return 0.3;
	}else if(betweenInclusive(10,39,drunk)){
		return 0.4;
	}else{
		return 0.45;
	}
};

function betweenInclusive(low, high, value){
	if(value <= high && value >= low)
		return true;
	else
		return false;	
};

function updateDisplays(){
	document.getElementById("canAmount").innerHTML = cans;
    document.getElementById("cartSize").innerHTML = cartSize;
    document.getElementById("money").innerHTML ="$"+money.toFixed(2);
    updateHungerDisplay();
    updateDrunkDisplay();
    checkShowButtons();
    document.getElementById("pushCartButton").title = "Chance to find a can: " + ((1 - getSuccessRate())*100).toFixed(2) + "%";
};

function updateHungerDisplay(){			
	document.getElementById("hungerBarInner").innerHTML = hunger + "%";
	document.getElementById("hungerBarInner").style.width = hunger +'%';
};

function updateDrunkDisplay(){
	document.getElementById("drunkBarInner").innerHTML = drunk + "%";
	document.getElementById("drunkBarInner").style.width = drunk +'%';
};

function checkShowButtons(){
	if(money >= 0.30 && hunger <= 70){
		document.getElementById("buyRamen").disabled = false;
	}else{
		document.getElementById("buyRamen").disabled = true;
	}

	if(money >= 1){
		document.getElementById("buyCartUpgrade").disabled = false;
	}else{
		document.getElementById("buyCartUpgrade").disabled = true;
	}
	if(money >= 0.67 && drunk <= 70){
		document.getElementById("buyBeer").disabled = false;
	}else{
		document.getElementById("buyBeer").disabled = true;
	}
};

function updateCans(amount){cans += amount;};
function updateHunger(amount){hunger += amount;};
function updateCartSize(amount){cartSize += amount;};
function updateMoney(amount){money += amount;};
function updateDrunk(amount){drunk += amount;};

function sellCans(){
	if(cans > 0){
		var moneyMade = cans * 0.02;		
		postMessage("You sold " + cans + " Cans for $"+moneyMade.toFixed(2));
		updateMoney(cans * 0.02);		
		cans = 0;
		updateDisplays(); 
	}	
};

function buyRamen(){
	if(money >= 0.30 && hunger <= 70){
		updateMoney(-0.30);
		updateHunger(30);			
		postMessage(messages[4]);
		updateDisplays();
	}
};

function buyBeer(){
	if(money >= 0.67 && drunk <= 70){
		updateMoney(-0.67);
		updateDrunk(30);
		updateCans(1);
		postMessage(messages[6])
		updateDisplays();
	}
};

function upgradeCart(){
	if(money >= 1){
		updateMoney(-1);
		updateCartSize(20);
		updateDisplays();
	}
};

function postMessage(string){
	document.getElementById("messageLog").innerHTML = string;
}
