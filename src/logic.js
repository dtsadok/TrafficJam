//returns object indicating whether spaces are available or not
function getAvailableSpaces(pieces) {
	//init grid info
	let grid = {};

	for (let i=1; i<=6; i++) {
		for (let j=1; j<=6; j++) {
			grid[`${i},${j}`] = true;
		}
	}

	//go through each piece and mark the
	//spaces they take up as not available
	for (let id in pieces) {
		let pc = pieces[id];

		for (let i=0; i<pc.size; i++) {
			if (pc.orient === "horiz") {
				grid[`${pc.col+i},${pc.row}`] = false;
			} else if (pc.orient === "vert") {
				grid[`${pc.col},${pc.row+i}`] = false;
			}
		}
	}

	return grid;
}

//show moves for a piece.
//should look like ["1,2", "1,3", etc],
//where each item represents a new coordinate for the piece.
function getPossibleMoves(pieceId, pieces) {
	let moves = [];
	const pc = pieces[pieceId];

	const availableSpaces = getAvailableSpaces(pieces);

	if (pc.orient === "horiz") {
		//check spaces to the left
		for (let i=pc.col-1; i>=1; i--) {
			const pos = `${i},${pc.row}`;
			//is the space available (i.e. not blocked?)
			if (availableSpaces[pos]) {
				moves.push(pos);
			} else { //once we're blocked we can't move any further
				break;
			}
		}

		//to the right
		for (let i=pc.col+pc.size; i<=6; i++) {
			if (availableSpaces[`${i},${pc.row}`]) {
				//we are moving from the left, so take that into account
				moves.push(`${i-pc.size+1},${pc.row}`);
			} else {
				break;
			}
		}
	} else if (pc.orient === "vert") {
		//check up
		for (let i=pc.row-1; i>=1; i--) {
			const pos = `${pc.col},${i}`;
			if (availableSpaces[pos]) {
				moves.push(pos);
			} else {
				break;
			}
		}

		//check down
		for (let i=pc.row+pc.size; i<=6; i++) {
			if (availableSpaces[`${pc.col},${i}`]) {
				//we are moving from the top, so take that into account
				moves.push(`${pc.col},${i-pc.size+1}`);
			} else {
				break;
			}
		}
	}

	return moves;
}

function movePiece(pieceId, pieces, newPos) {
	const pos = newPos.split(",").map(x => parseInt(x));
	pieces[pieceId].col = pos[0];
	pieces[pieceId].row = pos[1];
}

//use this if we want to exit the red car automatically
function canLeave(pieces) {
	const moves = getPossibleMoves("red", pieces);
	return moves.indexOf("5,3") >= 0;
}

function isWinner(pieces) {
	return (pieces.red.col === 5 && pieces.red.row === 3);
}

function copyBoard(pieces) {
	let boardCopy = {};

	for (let id in pieces) {
		boardCopy[id] = {...pieces[id]};
	}

	return boardCopy;
}
