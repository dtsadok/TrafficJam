function checkBoard(pieces, counter) {
	if (isWinner(pieces)) {
		return []; //empty array to store winning moves
	}

	if (counter == 0) {
		return null;
	}

	for (let id in pieces) {
		const possibleMoves = getPossibleMoves(id, pieces);
		for (let move of possibleMoves) {
			let boardCopy = copyBoard(pieces);
			movePiece(id, boardCopy, move);

			let moves = checkBoard(boardCopy, counter-1);
			if (moves !== null) {
				let o = {};
				o[id] = move;
				moves.unshift(o);
				return moves;
			}
		}
	}

	return null;
}

function copyBoard(pieces) {
	let boardCopy = {};

	for (let id in pieces) {
		boardCopy[id] = {...pieces[id]};
	}

	return boardCopy;
}
