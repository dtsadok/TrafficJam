function renderBoard(boardElement, pieces) {
	for (let id in pieces) {
		let p = pieces[id];

		console.log(`${p.col},${p.row}, ${p.orient} x ${p.size}`);

		const newPiece = document.createElement("div");

		newPiece.id = id;

		if (p.size === 2) {
			newPiece.classList.add("car");
		} else if (p.size === 3) {
			newPiece.classList.add("truck");
		}

		//TODO: error checking here
		if (p.orient) {
			newPiece.classList.add(p.orient);
		}

		boardElement.appendChild(newPiece);
	}

	//move pieces to where they need to go
	updateBoard(pieces);
}

function updateBoard(pieces) {
	for (let id in pieces) {
		const p = pieces[id];
		const e = document.getElementById(id);

		e.style.gridColumnStart = p.col;

		if (p.row) {
			e.style.gridRowStart = p.row;
		}
	}
}
