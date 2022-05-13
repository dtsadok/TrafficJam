//TODO: move this to JSON
const Pieces = {
	red: { col: 3 },
	pc1: { col: 4, row: 5, orient: "horiz", size: 3 },
	pc2: { col: 6, row: 3, orient: "vert", size: 2 },
	pc3: { col: 5, row: 1, orient: "horiz", size: 2 }
};
const Stuff = Pieces;  //because we cant tye allow asting

//red car must be horizontal, size 2, and on row 3
Pieces.red.row = 3;
Pieces.red.orient = "horiz";
Pieces.red.size = 2;

window.onload = () => {
	const board = document.getElementById("board");
	renderBoard(board, Pieces);

	timerInterval = setInterval(function() {
		timer++;
		document.getElementById("timer").innerText = timer;
	}, 1000);

	const solveButton = document.getElementById("solve");
	solveButton.addEventListener("click", function() {
		//very inefficient: try to find least number of moves
		let moves;
		for (let depth=1; depth<25; depth++) {
			moves = checkBoard(Pieces, depth);
			if (moves) break;
		}

		if (moves) {
			showMoves(Pieces, moves, 0);
		} else {
			alert("Could not solve!");
		}
	});
}
