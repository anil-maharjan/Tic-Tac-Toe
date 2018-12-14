var x = document.querySelectorAll(".square");
var playerName = document.querySelectorAll(".player");
var h3 = document.querySelectorAll("h3");
var pDisplay = document.querySelectorAll(".pDisplay");
var winningScoreDisplay = document.getElementById("winningScoreDisplay");
var img = document.querySelectorAll("img");
var player1, turnOfPlayer, numOfMoves, side; 
var col; // 0 while checking row and 1 when checking column
var temp; // 1 for row and 3 for column( a temporary variable)
var a, winner, p1Score, p2Score, gameOver, winningScore;  
var c,d,e;


init();

function init(){
	reset();
	onNewGame();
	onInputChange();
	nameChange();
	onSquareClick();
}

function onNewGame(){
	$("#newGame").on("click", function(){
	reset();
})
}

function onInputChange(){
	$("#numInput").on("change", function(){
	reset();
	$("#winningScoreDisplay").text($(this).val());
	winningScore = Number($(this).val());
})
}

function nameChange(){
	for(let j=0;j<2;j++)
{
	playerName[j].addEventListener("change", function(){
	h3[j].textContent = this.value;
	})
}
}

function onSquareClick(){
	$(".square").on("click", function(){
	if(!gameOver)
	{
		if($(this).text("")) 	
		{ //if the place is empty place a mark of the respective player
			player1?$(this).text("X"):$(this).text("O");
			player1 = !player1;
			numOfMoves++;
			winnerCheck();
		}
		else{ }
	}
});
}

$("#nxtRound").on("click", function(){
	basicReset();
	turnOfPlayer =player1= !turnOfPlayer;
	$(".square").removeClass("win");
})

	function winnerCheck(){
		if(numOfMoves>=5&&numOfMoves<=9)
	{
		if(checkForWinner()===true)
		{
			gameOver = true;
			var i;
			(!player1)?i=0:i=1;
			i===0?p1Score++:p2Score++;
			if(p1Score===winningScore||p2Score===winningScore)
			{
				img[i].setAttribute("src", "assets/img/happy.gif")
				$("img").css("display", "block");
				pDisplay[i].classList.add("winner")
				$("#nxtRound").css("display", "none");
			}
			i===0?pDisplay[i].textContent=p1Score:pDisplay[i].textContent=p2Score;
		}
		else
		{
			temp = 1;
			side = 9;
			a=col=0;
		}
	}

	}

function checkForWinner(){
	//Check Row Column and Diagonal
	return(rowColumn()||diagonalCheck());
}

function rowColumn()
	{
		for(var i=0;i<side;i-=0)
		{ //check is a variable to check if a player has won or not
			e = i;
			c=i+temp;
			d=c+temp;
			var check = x[i].textContent + x[i+=temp].textContent + x[i+=temp].textContent;
			if(check==="XXX"||check==="OOO")
			{
				x[e].classList.add("win");
				x[c].classList.add("win");
				x[d].classList.add("win");
				return true;
			}
			temp===1?i++:i=++a;
		}
		++col;
		if(col===1){
			temp=side=3;
			return(rowColumn());
		}
		else{
			return false;
		}
	}

	function diagonalCheck(){
		var d1 = x[0].textContent + x[4].textContent + x[8].textContent;
		var d2 = x[2].textContent + x[4].textContent + x[6].textContent;
		if((d1==="XXX"||d1==="OOO")||(d2==="XXX"||d2==="OOO"))
		{
			x[4].classList.add("win");
			if((d1==="XXX"||d1==="OOO"))
			{
				x[0].classList.add("win");
				x[8].classList.add("win");
			}else{
				x[2].classList.add("win");
				x[6].classList.add("win");
			}
			return true;
		}
		else
			return false;
	}

	function reset(){
	basicReset();
	$("img").attr("src", "assets/img/angry.gif");
	$("img").css("display", "none");
	player1= turnOfPlayer= true;
	p1Score= p2Score= pDisplay[0].textContent= pDisplay[1].textContent= 0;
	$(".pDisplay").removeClass("winner");
	$("#nxtRound").css("display", "block");
	winningScore= winningScoreDisplay.textContent= 3;
}

	function basicReset()
	{
		gameOver = false;
		temp=1;
		side=9;
		col=a=numOfMoves=0;
		$(".square").text("");
	}